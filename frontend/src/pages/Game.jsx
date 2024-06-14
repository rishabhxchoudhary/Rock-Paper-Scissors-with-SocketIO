// src/components/specific/Room.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import WaitingRoom from '../components/specific/WaitingRoom';

const Room = () => {
    const { roomId } = useParams();
    const socket = useSocket();
    const [choice, setChoice] = useState('');
    console.log(choice)
    const makeChoice = (choice) => {
        socket.emit('makeChoice', { roomId, playerId: socket.id, choice });
        setChoice(choice);
    };

    useEffect(()=> {
        socket.on('nextTurn', () => {
            setChoice('');
        });

    },[socket])


    return (
        <div>
            <WaitingRoom roomId={roomId} />
            {choice === '' && (
                <div>
                    <h2>Make your choice</h2>
                    <button onClick={() => makeChoice('rock')}>Rock</button>
                    <button onClick={() => makeChoice('paper')}>Paper</button>
                    <button onClick={() => makeChoice('scissors')}>Scissors</button>
                </div>
            )}
        </div>
    );
};

export default Room;
