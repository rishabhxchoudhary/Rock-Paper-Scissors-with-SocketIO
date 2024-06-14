import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';


const CreateRoom = () => {
    const [roomId, setRoomId] = useState('');
    const socket = useSocket();
    // const navigate = useNavigate();
    

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if (roomId.trim()) {
            socket.emit('createRoom', roomId, () => {
                console.log('Room created', roomId)
            });
            setRoomId('');
        }
    };

    return (
        <div>
            <h2>Create Room</h2>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
            />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>
    );
};

export default CreateRoom;
