const circleStyle = (color: string): React.CSSProperties => ({
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: color,
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#000',
    cursor: 'pointer',
});

export default circleStyle;