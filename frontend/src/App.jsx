import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://app-chat-backend-ean1.onrender.com");

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
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat Bananero</h1>
        <input
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
        />
        <button>Send</button>
        <ul>
          {messages.map((mensajes, i) => {
            return (
              <li
                key={`${mensajes.from}${i}`}
                className={`my-2 p-2 table text-sm rounded-md ${
                  mensajes.from === "Me" ? ` bg-sky-700 ` : `bg-black ml-auto`
                }`}
              >
                <span className="text-xs text-slate-700 font-bold">
                  {mensajes.from}
                </span>
                :{mensajes.body}
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
