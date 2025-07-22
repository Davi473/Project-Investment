import React from 'react';
import { Minimize } from './Components/Minimize';
import { Maximize } from './Components/Maximize';
import { Close } from './Components/Close';


const baseStyle: React.CSSProperties = {
  width: "68px",
  display: 'flex',
  alignItems: 'center',
  paddingTop: '5px',
  position: 'absolute',
  top: 0,
  zIndex: 1000,
  justifyContent: "space-between"
};


export const WindowControls: React.FC = () => {
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    if (window.electronAPI && window.electronAPI.getPlatform) {
      const platform = window.electronAPI.getPlatform();
      setIsMac(platform === 'darwin');
    }
  }, []);

  return (
    <div
      style={
        isMac
          ? { ...baseStyle, left: "5px", right: 'unset' }
          : { ...baseStyle, right: '5px', left: 'unset' }
      }
    >
      {isMac ? (
        <>
          <Close />
          <Minimize />
          <Maximize />
        </>
      ) : (
        <>
          <Minimize />
          <Maximize />
          <Close />
        </>
      )}
    </div>
  );
};
