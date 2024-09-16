import React from 'react';

const RestartButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }}>
    Restart
  </button>
);

export default RestartButton;
