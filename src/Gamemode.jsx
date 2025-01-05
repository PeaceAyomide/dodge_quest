import React, { useState, useEffect, useCallback } from 'react'


const Gamemode = () => {
  const [showGuide, setShowGuide] = useState(false); // State for the guide overlay
  

      const [playerPosition, setPlayerPosition] = useState(300);
      const [fallingObjects, setFallingObjects] = useState([]);
      const [score, setScore] = useState(0);
      const [gameOver, setGameOver] = useState(false);
      const [gameStarted, setGameStarted] = useState(false);
      const [speed, setSpeed] = useState(2);
    
      const getGameDimensions = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
          width: width < 340 ? 320 : width < 768 ? Math.min(width * 0.9, 600) : 600,
          height: height < 650 ? 450 : height < 768 ? Math.min(height * 0.6, 400) : 400
        };
      };
    
      const PLAYER_WIDTH = window.innerWidth < 340 ? 30 : 50;
      const PLAYER_HEIGHT = window.innerWidth < 340 ? 30 : 50;
      const OBJECT_SIZE = window.innerWidth < 340 ? 15 : 20;
    
      const [gameDimensions, setGameDimensions] = useState(getGameDimensions());
    
      useEffect(() => {
        const handleResize = () => {
          setGameDimensions(getGameDimensions());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const handleKeyPress = useCallback((e) => {
        if (gameOver || !gameStarted) return;
        
        const MOVE_DISTANCE = 20;
        if (e.key === 'ArrowLeft') {
          setPlayerPosition(prev => Math.max(0, prev - MOVE_DISTANCE));
        }
        if (e.key === 'ArrowRight') {
          setPlayerPosition(prev => Math.min(gameDimensions.width - PLAYER_WIDTH, prev + MOVE_DISTANCE));
        }
      }, [gameOver, gameStarted, gameDimensions.width]);
    
      const handleTouchMove = useCallback((e) => {
        if (gameOver || !gameStarted) return;
        const touch = e.touches[0];
        const gameArea = e.currentTarget.getBoundingClientRect();
        const newPosition = touch.clientX - gameArea.left - (PLAYER_WIDTH / 2);
        setPlayerPosition(Math.max(0, Math.min(gameDimensions.width - PLAYER_WIDTH, newPosition)));
      }, [gameOver, gameStarted]);

      const handleTouchStart = (e) => {
        if (!gameStarted || gameOver) return;
        const touch = e.touches[0];
        const screenMiddle = window.innerWidth / 2;
        
        if (touch.clientX < screenMiddle) {
          // Move left
          setPlayerPosition((prev) => 
            Math.max(0, prev - 20)
          );
        } else {
          // Move right
          setPlayerPosition((prev) => 
            Math.min(gameDimensions.width - PLAYER_WIDTH, prev + 20)
          );
        }
      };
    
      useEffect(() => {
        if (gameOver || !gameStarted) return;
    
        const gameLoop = setInterval(() => {
          setFallingObjects(prevObjects => {
            const updatedObjects = prevObjects.map(obj => ({
              ...obj,
              y: obj.y + speed
            }));
    
            const collision = updatedObjects.some(obj => 
              obj.y + OBJECT_SIZE >= gameDimensions.height - PLAYER_HEIGHT &&
              obj.x + OBJECT_SIZE >= playerPosition &&
              obj.x <= playerPosition + PLAYER_WIDTH
            );
    
            if (collision) {
              setGameOver(true);
              clearInterval(gameLoop);
            }
    
            return updatedObjects.filter(obj => obj.y < gameDimensions.height);
          });
    
          setScore(prev => prev + 0.2);
        }, 16);
    
        return () => clearInterval(gameLoop);
      }, [playerPosition, gameOver, speed, gameStarted]);
    
      useEffect(() => {
        if (gameOver || !gameStarted) return;
    
        const spawnInterval = setInterval(() => {
          setFallingObjects(prev => [
            ...prev,
            {
              x: Math.random() * (gameDimensions.width - OBJECT_SIZE),
              y: 0,
              id: Date.now()
            }
          ]);
        }, 700);
    
        return () => clearInterval(spawnInterval);
      }, [gameOver, gameStarted]);
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
      }, [handleKeyPress]);
    
      const moveLeft = () => {
        if (gameOver || !gameStarted) return;
        setPlayerPosition(prev => Math.max(0, prev - 20));
      };
    
      const moveRight = () => {
        if (gameOver || !gameStarted) return;
        setPlayerPosition(prev => Math.min(gameDimensions.width - PLAYER_WIDTH, prev + 20));
      };
    
      const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setFallingObjects([]);
        setPlayerPosition(gameDimensions.width / 2 - PLAYER_WIDTH / 2);
        setGameOver(false);
        setSpeed(2);
      };
    

      
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900 p-2 " onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
       <div className="wrapper absolute inset-0">
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
     {/* Guide Button */}
     <div>
      
     </div>
     <div className='p-4'>
     <button
        className=" relative bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={() => setShowGuide(true)}
      >
        Help
      </button>

     </div>
    
   
      {/* Guide Overlay */}
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Game Guide</h2>
            <p className="text-lg mb-4">
      <span className="font-bold text-blue-500">PC:</span> Use the arrow keys to move and avoid falling objects.
    </p>
    <p className="text-lg mb-4">
      <span className="font-bold text-blue-400">Mobile:</span> Tap the left or right side of the screen to move the player.
    </p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowGuide(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div 
        className="relative overflow-hidden bg-gray-800 rounded-lg"
        style={{ 
          width: gameDimensions.width, 
          height: gameDimensions.height 
        }}
        
      >
        <div
          className="absolute bottom-0 bg-blue-500 rounded-md"
          style={{
            left: playerPosition,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT
          }}
        />
        
        {fallingObjects.map(obj => (
          <div
            key={obj.id}
            className="absolute bg-red-500 animate-spin"
            style={{ 
              left: obj.x, 
              top: obj.y,
              width: OBJECT_SIZE,
              height: OBJECT_SIZE,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        ))}

        <div className="absolute top-4 right-4 text-white text-lg">
          Score: {Math.floor(score)}
        </div>

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <button
              className="px-6 py-3 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="text-white text-center">
              <h2 className="text-2xl mb-4">Game Over!</h2>
              <p className="text-lg">Final Score: {Math.floor(score)}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                onClick={startGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
  
      </div>
      
    </div>
  )
}

export default Gamemode