import React from 'react';
import circleStyle from '../styleButton';

export const Minimize: React.FC = () => {
  return (
        <div 
            style={{ ...circleStyle('#f4bf4f'), WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            onClick={() => window.electronAPI.minimize()}
        >
            <span style={styles.span1}>
                <span style={styles.span2}/>
            </span>
        </div>
    );
};

const styles: any = {
    span1: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        position: 'relative',
    },
    span2: {
        position: 'absolute',
        top: '4px', 
        left: '1px',
        width: '8px',
        height: '2px', 
        background: '#222',
        borderRadius: '1px',
        display: 'block',
    }
}