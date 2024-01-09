import { useAnimations, useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useChat } from "../hooks/useChat";
import { GLTF } from "three-stdlib";
import {
  facialExpressions,
  ExpressionType,
  FacialExpressionsType,
  LipsyncDataType,
} from "../@types/faceExpressions";
import { Audio } from "expo-av";

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
  };
};
type GLTFAnimationsResult = GLTF & {
  nodes: {
    Hips: THREE.Bone;
  };
  materials: {};
};

type ActionName =
  | "Angry"
  | "Crying"
  | "Idle"
  | "Laughing"
  | "Rumba"
  | "Talking_0"
  | "Talking_1"
  | "Talking_2"
  | "Terrified";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_aa",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode = false;

export function Torso(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials, scene } = useGLTF(
    require("../assets/models/torso.glb")
  ) as GLTFResult;

  const { message, onMessagePlayed, chat } = useChat();

  const [lipsync, setLipsync] = useState<LipsyncDataType>();

  const { animations } = useGLTF(
    require("../assets/models/animations.glb")
  ) as GLTFAnimationsResult;
  const group = useRef<null | THREE.Group<THREE.Object3DEventMap>>(null);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState<string>(
    animations.find((a) => a.name === "Idle") ? "Idle" : animations[0].name // Check if Idle animation exists otherwise use first animation
  );
  useEffect(() => {
    //console.log("message", message);
    if (!message) {
      setAnimation("Idle");
      return;
    }
    setAnimation(message.animation);
    setFacialExpression(message.facialExpression);
    //console.log("message.lipsync",message.lipsync);
    setLipsync(message.lipsync);
    const playAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({
          uri: "data:audio/mp3;base64," + message.audio,
        });
        setAudio(sound);
        await sound.playAsync().then((status) => {});
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            status.didJustFinish && onMessagePlayed();
          }
        });
      } catch (error) {
        console.error("Erro ao reproduzir o áudio:", error);
      }
    };
    playAudio();

    return () => {
      if (audio) {
        audio.unloadAsync();
      }
    };
  }, [message]);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return (): void => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  const lerpMorphTarget = (target: string, value: number, speed = 0.1) => {
    scene.traverse((child) => {
      //console.log("child", child.children[0]);
      //console.log("child type",typeof child);
      if (child.type == "SkinnedMesh") {
        let skinnedChild = child as THREE.SkinnedMesh;

        if (skinnedChild.isSkinnedMesh && skinnedChild.morphTargetDictionary) {
          const index = skinnedChild.morphTargetDictionary[target];
          if (
            index === undefined ||
            skinnedChild.morphTargetInfluences![index] === undefined
          ) {
            if(target.includes("viseme")){
                console.log("deu ruim!");
            }
            return;
          } else if (
            skinnedChild.morphTargetInfluences &&
            skinnedChild.morphTargetInfluences[index] !== undefined
          ) {
            if(target.includes("viseme")){
                console.log("it does includes!");
            }
            skinnedChild.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              skinnedChild.morphTargetInfluences[index],
              value,
              speed
            );
          }
        }
      }
    });
  };

  const [blink, setBlink] = useState(false);
  const [facialExpression, setFacialExpression] =
    useState<keyof FacialExpressionsType>("default");
  const [audio, setAudio] = useState<Audio.Sound>();
  useFrame(() => {
    const mapping: ExpressionType = facialExpressions[facialExpression];
    !setupMode &&
      nodes.EyeLeft.morphTargetDictionary &&
      Object.keys(mapping).forEach((key) => {
        if (key in mapping) {
          let mappingKey = key as keyof ExpressionType;
          let currentMap: number = mapping[mappingKey] as number;
          if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
            return; // eyes wink/blink are handled separately
          }
          if (mapping && currentMap) {
            lerpMorphTarget(key, currentMap, 0.1);
          } else {
            lerpMorphTarget(key, 0, 0.1);
          }
        }
      });

    lerpMorphTarget("eyeBlinkLeft", blink ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink ? 1 : 0, 0.5);

    // LIPSYNC
    if (setupMode) {
      return;
    }
    const appliedMorphTargets: string[] = [];
    if (message && lipsync) {
      let currentAudioTime: number = 0;
      if (audio !== undefined) {
        audio.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            status.progressUpdateIntervalMillis = 10;
            currentAudioTime = Number(
              (status.positionMillis / 1000).toPrecision(2)
            );
            console.log("currentAudioTime", currentAudioTime);
            for (let i = 0; i < lipsync.mouthCues.length; i++) {
              const mouthCue = lipsync.mouthCues[i];
              if (
                currentAudioTime >= mouthCue.start &&
                currentAudioTime <= mouthCue.end
              ) {
                let currentCue = corresponding[mouthCue.value];
                appliedMorphTargets.push(currentCue);
                lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
                break;
              }
            }
          }
        });
      }
    }

    Object.values(corresponding).forEach((value) => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  useEffect(() => {
    let blinkTimeout: string | number | NodeJS.Timeout | undefined;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);
  return (
    <group
      {...props}
      dispose={null}
      ref={group}
      scale={5}
      position={[-0.15, -8, 2]}
    >
      <primitive object={nodes.Hips} />

      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/models/torso.glb"));
useGLTF.preload(require("../assets/models/animations.glb"));
