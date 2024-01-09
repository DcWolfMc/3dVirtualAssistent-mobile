import { ChatProvider} from "./src/hooks/useChat";
import { AssistScreen } from "./src/components/AssistScreen";
import { StatusBar } from "expo-status-bar";
export default function App() {

  return (
    <ChatProvider>
      <StatusBar style="inverted" />
      <AssistScreen/>
    </ChatProvider>
  );
}
