import { useEffect } from "react";
import { socket } from "./socket/socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    })

    return () => {
      socket.off("connect");
    }
  }, []);

  return (
    <div>
      <h1>Live Chat</h1>
    </div>
  );
}

export default App;