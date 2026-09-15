import { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import NameModal from "./components/NameModal";
import ChatPage from "./pages/ChatPage";

function App() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    })

    return () => {
      socket.off("connect");
    }
  }, []);

  const handleJoin = (name : string)=>{
    setUserName(name)
    socket.emit("join", name)
  }
  if (!userName) {
    return <NameModal onJoin={handleJoin} />;
  }

  return <ChatPage username={userName} />;
}

export default App;