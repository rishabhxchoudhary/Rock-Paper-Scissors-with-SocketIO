import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Room from './pages/Room'
import Game from './pages/Game';


export default function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room" element={<Room/>} />
          <Route path="/room/:roomId" element={<Game/>} />
        </Routes>
    </div>
  );
}