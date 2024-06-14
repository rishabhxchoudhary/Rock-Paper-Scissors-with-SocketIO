import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socketService from '../services/socketService';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    SocketProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = socketService.connect();
        setSocket(socketInstance);

        return () => {
            socketService.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
