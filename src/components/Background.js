import React from 'react';
import { useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import spaceBackground from '../assets/space-background.jpg';

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, '../assets/space-background.jpg');

  return (
    <Sphere args={[100, 32, 32]} scale={[-1, 1, 1]}>
      <meshBasicMaterial attach="material" map={texture} />
    </Sphere>
  );
};

export default Background;
