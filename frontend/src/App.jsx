import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://app-chat-backend-ean1.onrender.com", {
  withCredentials: true,
});

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
  };

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="h-screen bg-zinc-800 text-white flex items-center justify-center"
    >
      <form
        style={{
          height: "800px",
          position: "relative",
          width: "500px",
          backgroundImage:
            "url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/EL_BANANERO.jpg/1200px-EL_BANANERO.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 rounded-md"
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl font-extrabold my-2 text-red-950">
            Chat Bananero
          </h1>
          <input
            type="text"
            placeholder="Dale pretensioso, escribi algo!"
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-zinc-500 p-2 w-80 text-black"
            value={message}
          />
          <button className="bg-orange-500 rounded mt-2 p-1 font-bold">
            Send
          </button>
        </div>
        <ul
          style={{
            width: "100%",
            overflow: "auto",
            height: "80%",
            marginTop: "100px",
          }}
        >
          {messages.map((mensajes, i) => {
            return (
              <li
                key={`${mensajes.from}${i}`}
                className={`my-2 p-2 table text-sm rounded-md ${
                  mensajes.from === "Me" ? ` bg-sky-700 ` : `bg-black ml-auto`
                }`}
              >
                <p className="text-xs text-red-500 font-bold">
                  {mensajes.from !== "Me" ? "ANOnymous" : "Me"}
                </p>
                {mensajes.body}
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
