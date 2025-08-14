import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { router as notificationsRoutes } from "./routes/api-routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200", // domínio do Angular
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", notificationsRoutes);

/**
 * Cria servidor HTTP
 */
const server = http.createServer(app);

/**
 * Servidor WebSocket
 */
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

export { io, server };
