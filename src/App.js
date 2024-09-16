import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import usePointerLockControls from './components/usePointerLockControls';
import Target from './components/Target';
import Crosshair from './components/Crosshair';
import RestartButton from './components/RestartButton';
import spaceBackground from './assets/space-background.jpg'; // Import the background image

const ThreeScene = () => {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [gameOver, setGameOver] = useState(false);

  // Move targets farther from the camera
  const targetDistance = 90;

  const createRandomTarget = () => {
    const x = Math.random() * 40 - 20;
    const y = Math.random() * 40 - 20;
    const z = targetDistance; 
    return { position: [x, y, z] };
  };

  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => {
      if (!gameOver) {
        setTargets(prevTargets => {
          if (prevTargets.length >= 5) {
            return prevTargets.slice(1); // Remove the oldest target if there are too many
          }
          return [...prevTargets, createRandomTarget()];
        });
        setTimer(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targets, timer, gameOver]);

  const handleTargetClick = (index) => {
    setScore(prev => prev + 1);
    setTargets(prevTargets => prevTargets.filter((_, i) => i !== index));
    setTargets(prevTargets => [...prevTargets, createRandomTarget()]);
  };

  const handleRestart = () => {
    setTargets([]);
    setScore(0);
    setTimer(30);
    setGameOver(false);
  };

  const cameraRef = useRef();
  const rendererRef = useRef();

  usePointerLockControls(cameraRef.current, rendererRef.current);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      background: `url(${spaceBackground}) no-repeat center center fixed`, 
      backgroundSize: 'cover', 
      overflow: 'hidden' 
    }}>
      <Canvas
        onCreated={({ camera, gl }) => {
          cameraRef.current = camera;
          rendererRef.current = gl;
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 1, 40]} />
        {targets.map((target, index) => (
          <Target
            key={index}
            position={target.position}
            onClick={() => handleTargetClick(index)}
          />
        ))}
      </Canvas>
      <Crosshair />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'white',
        padding: '10px',
        zIndex: 1
      }}>
        <div>Score: {score}</div>
        <div>Time Left: {timer}s</div>
        {gameOver && <div>Game Over!</div>}
        {gameOver && <RestartButton onClick={handleRestart} />}
      </div>
    </div>
  );
};

export default ThreeScene;
