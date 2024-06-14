import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const socket = useSocket();
    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomId.trim() && playerName.trim()) {
            socket.emit('joinRoom', { roomId, playerName: playerName, playerId: socket.id }, () => {
                navigate(`/room/${roomId}`);
            });
            setRoomId('');
            setPlayerName('');
        }
    };

    return (
        <div>
            <h2>Join Room</h2>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
            />
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter Player ID"
            />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    );
};

export default JoinRoom;