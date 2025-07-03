import React from 'react';
import { Minimize } from './Components/Minimize';
import { Maximize } from './Components/Maximize';
import { Close } from './Components/Close';

export const WindowControls: React.FC = () => {
  return (
    <div style={styles.div}>
      <Minimize />
      <Maximize />
      <Close />
    </div>
  );
};

const styles: any = {
  div: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    position: 'absolute',
    top: 0,
    right: 10, 
    zIndex: 1000,
  }
} 