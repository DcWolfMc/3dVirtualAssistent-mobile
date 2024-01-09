import { Canvas } from "@react-three/fiber/native";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Environment } from "@react-three/drei/native";
import { Suspense, useState } from "react";
import Loader from "./Loader";
import useControls from "r3f-native-orbitcontrols"
import Trigger from "./Trigger";
import { Avatar } from "./Avatar";
import { useChat } from "../hooks/useChat";
import { Feather } from "@expo/vector-icons";
// import { Loader } from "@react-three/drei";

export const AssistScreen = () => {
  // const [OrbitControls, events] = useControls();
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [hideUI, setHideUI] = useState<boolean>(false);
  const { chat, message, loadingChat } = useChat();
  const disableSendButton = loadingChat || loading || message === "" || input==="";
  const disableSpeakButton = loadingChat || loading;
  console.log("disableSendButton", disableSendButton);

  const sendMessage = () => {
    chat(input);
    setInput("");
  };
  const callIntroText = () => {
    chat();
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="relative z-20 w-full top-10 rounded-2xl items-center">
        <TouchableOpacity
          className={
            hideUI
              ? `z-20 mx-4 top-4 bottom-0 bg-pink-500/10 p-[14] px-4 rounded-md self-start`
              : `z-20 mx-4 top-4 bottom-0 bg-pink-500 p-[14] px-4 rounded-md self-start`
          }
          onPress={() => {
            setHideUI((prev) => !prev);
            console.log("click");
          }}
        >
          <Feather
            name={hideUI ? "eye-off" : "eye"}
            size={24}
            color={hideUI ? "#fefefe2f" : "#fefefe"}
          />
        </TouchableOpacity>
        <View
          className={`${
            hideUI && "hidden"
          } absolute flex-1 p-4 flex-row items-center gap-2 bg-slate-100/5 pointer-events-auto backdrop-blur-md w-full mx-auto justify-end`}
        >
          <TouchableOpacity
            disabled={disableSpeakButton}
            className={
              disableSpeakButton
                ? `bg-pink-500/50 text-white p-4 px-10 font-semibold uppercase rounded-md`
                : `bg-pink-500 text-white p-4 px-10 font-semibold uppercase rounded-md`
            }
            onPress={() => callIntroText()}
          >
            <Text className="color-gray-200 font-bold uppercase">Speak</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className=" flex-1  ">
        {(loading || loadingChat) && <Loader />}
        <Canvas
          onCreated={(state) => {
            const _gl = state.gl.getContext();

            const pixelStorei = _gl.pixelStorei.bind(_gl);
            _gl.pixelStorei = function (...args) {
              const [parameter] = args;

              switch (parameter) {
                // expo-gl only supports the flipY param
                case _gl.UNPACK_FLIP_Y_WEBGL:
                  return pixelStorei(...args);
              }
            };
          }}
        >
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            {/* <OrbitControls enablePan={false} /> */}
            <Environment preset="dawn" resolution={0.1} />
            <Avatar/>
          </Suspense>
        </Canvas>
      </View>
      <View
        className={`${
          hideUI && "hidden"
        } w-full absolute min-h-[48] bottom-2 justify-between rounded-2xl items-center`}
      >
        <View className="p-4 flex  items-center gap-2 bg-slate-100/5 pointer-events-auto backdrop-blur-md max-w-screen-sm w-full mx-auto">
          <TextInput
            className="w-full border-gray-200/20 border placeholder:text-gray-200 placeholder:italic p-4 rounded-md bg-white/50 bg-opacity-0 "
            placeholder="Type a message..."
            onChangeText={(e) => setInput(e)}
            value={input}
          />
          <TouchableOpacity
            disabled={disableSendButton}
            className={
              disableSendButton
                ? `bg-pink-500/50 text-white p-4 px-16 rounded-md`
                : `bg-pink-500 text-white p-4 px-16 rounded-md`
            }
            onPress={() => sendMessage()}
          >
            <Text className="color-gray-200 font-bold uppercase">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
