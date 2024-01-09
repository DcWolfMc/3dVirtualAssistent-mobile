import { Canvas } from "@react-three/fiber/native";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Environment } from "@react-three/drei/native";
import { Model } from "./Model";
import { Suspense, useState } from "react";
import { Chair } from "./Chair";
import Loader from "./Loader";
import useControls from "r3f-native-orbitcontrols";
import Trigger from "./Trigger";
import { Avatar } from "./Avatar";
import { useChat } from "../hooks/useChat";
import { Torso } from "./Torso";
// import { Loader } from "@react-three/drei";

export const AssistScreen = () => {
  // const [OrbitControls, events] = useControls();
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const { chat, message, loadingChat } = useChat();
  
  const sendMessage = () => {
      chat(input);
      setInput("");
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      {/* <View className=" flex-1  " {...events}> */}
      <View className=" flex-1  ">
        {loading && <Loader />}
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
            <Environment preset="sunset" />
            <Avatar />
          </Suspense>
        </Canvas>
      </View>
      <View className="w-full absolute min-h-[48] bottom-2 justify-between rounded-2xl  items-center">
        <View className="p-4 flex  items-center gap-2 bg-slate-100/5 pointer-events-auto backdrop-blur-md max-w-screen-sm w-full mx-auto">
          <TextInput
            className="w-full border-gray-200/20 border placeholder:text-gray-200 placeholder:italic p-4 rounded-md bg-white/50 bg-opacity-0 "
            placeholder="Type a message..."
            onChangeText={(e) => setInput(e)}
            value={input}
          />
          <TouchableOpacity
            disabled={(loadingChat || loading || message === "")}
            className={` bg-pink-500 text-white p-4 px-16 font-semibold uppercase rounded-md disabled:bg-pink-500/50`}
            onPress={() => sendMessage()}
          >
            <Text className="color-gray-200">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
