// src/components/specific/WaitingRoom.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import PropTypes from 'prop-types';

const WaitingRoom = ({ roomId }) => {
    WaitingRoom.propTypes = {
        roomId: PropTypes.string.isRequired,
    };

    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [gameState, setGameState] = useState('waiting for opponent to join');

    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit('getRoomState', roomId, (roomState) => {
            if (roomState) {
                console.log(roomState)
                setPlayer1(roomState.player1);
                setPlayer2(roomState.player2);
                setScore1(roomState.score1);
                setScore2(roomState.score2);
                setGameState(roomState.gameState);
                if (roomState.gameState === 'finished') {
                    setTimeout(() => {
                        navigate('/');
                    }, 3000); 
                }
            }
        });

        socket.on('roomState', (roomState) => {
            console.log(roomState)
            setPlayer1(roomState.player1);
            setPlayer2(roomState.player2);
            setScore1(roomState.score1);
            setScore2(roomState.score2);
            setGameState(roomState.gameState);
            if (roomState.gameState === 'finished') {
                setTimeout(() => {
                    navigate('/');
                }, 3000); 
            }
        });

        socket.on('gameOver', () => {
            setTimeout(() => {
                navigate('/');
            }, 3000); 
        });

        return () => {
            socket.off('roomState');
            socket.off('gameOver');
        };

    }, [socket, roomId, navigate]);

    const renderGameState = () => {
        switch (gameState) {
            case 'waiting for opponent to join':
                return <h2>Waiting for an opponent...</h2>;
            case 'waiting for players to make a choice':
                return <h2>Waiting for players to make a choice</h2>;
            case 'playing':
                return <h2>Calculating Result...</h2>;
            case 'finished':
                return <h2>Game Over... You will be Redirected in 3s.</h2>;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderGameState()}
            {gameState != 'waiting for opponent to join' && (
                <div>
                    <p>Room ID: {roomId}</p>
                    <p>Player1: {player1} : Score: {score1}</p>
                    <p>Player2: {player2} : Score: {score2}</p>
                </div>
            )}
            {
                gameState === 'finished' && (
                    <>
                    {score1 > score2 ? <h2>{player1} Wins!</h2> : <h2>{player2} Wins!</h2>}
                    </>
                )
            }
        </div>
    );
};

export default WaitingRoom;
