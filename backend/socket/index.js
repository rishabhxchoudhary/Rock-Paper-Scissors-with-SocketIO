import { Server } from "socket.io";
import socketManager from "./socketManager.js";

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",  // Adjust as needed for security
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        socketManager(socket,io);
    });

    return io;
};

export default initializeSocket;