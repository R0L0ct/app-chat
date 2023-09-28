import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { typeDefs } from "../graphql/schema.js";
import { resolvers } from "../graphql/resolvers.js";
import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";
import { pool } from "../db/database.js";

const app = express();

const aserver = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

await aserver.start();
app.use("/graphql", cors(), json(), expressMiddleware(aserver));

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://app-chat-frontend.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", async (body) => {
    // let query =
    //   "INSERT INTO messages(id, messagecontent) VALUES ($1, $2) RETURNING *";
    // let values = [socket.id, body];
    // let response = await pool.query(query, values);

    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

server.listen(3000);
console.log("Server on port 3000");
