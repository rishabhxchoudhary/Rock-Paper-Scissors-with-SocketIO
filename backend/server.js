import express from "express";
import http from "http";
import initializeSocket from "./socket/index.js";


const app = express();
const server = http.createServer(app);

const io = initializeSocket(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});