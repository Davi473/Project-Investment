import React from 'react';
import circleStyle from '../styleButton';

export const Maximize: React.FC = () => {
  return (
        <div 
            style={{...circleStyle('#f9d949'),  WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            onClick={() => window.electronAPI.maximize()}
        >
            <span style={styles.span1}>
                <span style={styles.span2}/>
            </span>
        </div>
    );
};

const styles: any = {
    span1: {
        display: "inline-block",
        width: "10px",
        height: "10px",
        position: "relative",
    },
    span2: {
        position: "absolute",
        top: "1px",
        left: "1px",
        width: "8px",
        height: "8px",
        border: "1.7px solid #222",
        borderRadius: "2px",
        boxSizing: "border-box",
    }
}
