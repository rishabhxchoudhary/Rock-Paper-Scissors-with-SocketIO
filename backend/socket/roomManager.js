import Room from "./room.js";

class RoomManager {
    constructor() {
        this.rooms = {};
    }

    createRoom(roomId) {
        if (!this.rooms[roomId]) {
            this.rooms[roomId] = new Room(roomId);
        }
        console.log(`Room ${roomId} created`);
    }

    getRoom(roomId) {
        return this.rooms[roomId];
    }

    removeRoom(roomId) {
        delete this.rooms[roomId];
    }
}

export default new RoomManager();
