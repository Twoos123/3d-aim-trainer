import React from 'react';

const Crosshair = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: '1px solid white',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none'
  }} />
);

export default Crosshair;
