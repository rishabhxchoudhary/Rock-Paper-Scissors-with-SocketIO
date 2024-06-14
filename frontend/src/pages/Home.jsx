import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Socket.IO App</h1>
            <p>This is the home page of your application.</p>
            <div>
                <Link to="/room">
                    <button>Go to Room Management</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
