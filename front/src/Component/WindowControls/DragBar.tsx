import React from 'react';

const DragBar: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '32px',
        WebkitAppRegion: 'drag',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      } as React.CSSProperties}
    />
  );
};

export default DragBar;
