import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameWelcome from './GameWelcome';
import GameMode from './Gamemode';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameWelcome />} />
        <Route path="/gamemode" element={<GameMode />} />
    
      </Routes>
    </BrowserRouter>
  );
};

export default App;