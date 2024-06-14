import socketEvents from "./socketEvents.js";

const socketManager = (socket,io) => {
    console.log(`New client connected: ${socket.id}`);

    socketEvents(socket,io);

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        // Handle additional clean-up if necessary
    });
};

export default socketManager;
