import roomManager from './roomManager.js';

const socketEvents = (socket,io) => {
    socket.on("createRoom", (roomId, callback) => {
        roomManager.createRoom(roomId);
        socket.join(roomId);
        callback({ success: true, roomId });
    });

    socket.on("joinRoom", ({ roomId, playerName, playerId }, callback) => {
        const room = roomManager.getRoom(roomId);
        if (room && room.addPlayer(playerId, playerName)) {
            socket.join(roomId);
            console.log(`Player ${playerId} joined room ${roomId}`);
            io.to(roomId).emit("roomState", room.getState());
            if (callback) {
                callback({ success: true, roomId });
            }
            socket.on('disconnect', () => {
                room.removePlayer(playerId);
                socket.leave(roomId);
                io.to(roomId).emit("roomState", room.getState());
                if (room.players1==null && room.players2==null) {
                    roomManager.removeRoom(roomId);
                }
            });
        } else {
            if (callback) {
                callback({ success: false, message: "Room full or not found" });
            }
        }
    });

    socket.on("leaveRoom", ({ roomId, playerId }) => {
        const room = roomManager.getRoom(roomId);
        if (room) {
            room.removePlayer(playerId);
            socket.leave(roomId);
            console.log(`Player ${playerId} left room ${roomId}`);
            io.to(roomId).emit("roomState", room.getState());
            if (room.players1==null && room.players2==null) {
                roomManager.removeRoom(roomId);
            }
        }
    });

    socket.on("makeChoice", ({ roomId, playerId, choice }) => {
        const room = roomManager.getRoom(roomId);
        if (room) {
            room.makeChoice(playerId, choice);
            room.calculateResult();
            io.to(roomId).emit("roomState", room.getState());
            if (room.gameState==='playing') {
                room.gameState = 'waiting for players to make a choice';
                io.to(roomId).emit("nextTurn", room.getState());
            }
            if (room.gameState === 'finished') {
                roomManager.removeRoom(roomId);
                setTimeout(() => {
                    io.to(roomId).emit("gameOver", room.getState());
                    roomManager.removeRoom(roomId);
                }, 3000); 
            }
        }
    });

    socket.on("getRoomState", (roomId, callback) => {
        const room = roomManager.getRoom(roomId);
        if (room) {
            socket.emit("roomState", room.getState());
            if (callback) {
                callback(room.getState());
            }
        } else {
            if (callback) {
                callback(null);
            }
        }
    });
};

export default socketEvents;