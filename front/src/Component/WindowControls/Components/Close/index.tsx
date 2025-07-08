import React from 'react';
import circleStyle from '../styleButton';

export const Close: React.FC = () => {
  return (
        <div 
            style={{...circleStyle('#ff5f57'), WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            onClick={() => {
                window.electronAPI.close();
            }}
        >
            <span style={styles.span1}>
                <span style={styles.span2}/>
                <span style={styles.span3}/>
            </span>
        </div> 
    );
};

const styles: any = {
    span1: {
        position: 'relative',
        width: '10px',
        height: '10px',
        display: 'inline-block',
    },
    span2: {
        position: "absolute",
        left: "4px",
        top: "0px",
        width: "1.2px", 
        height: "10px",
        background: "#222",
        borderRadius: "1px",
        transform: "rotate(45deg)",
    },
    span3: {
        position: "absolute",
        left: "4px",
        top: "0px",
        width: "1.2px", 
        height: "10px",
        background: "#222",
        borderRadius: "1px",
        transform: "rotate(-45deg)",
    }
}