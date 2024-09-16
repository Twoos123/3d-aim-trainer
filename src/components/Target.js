import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const Target = ({ position, onClick }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate target
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={position}
      onClick={onClick}
      args={[2, 32, 32]} // Adjust radius and segments for the sphere
    >
      <meshStandardMaterial attach="material" color="hotpink" />
    </Sphere>
  );
};

export default Target;
