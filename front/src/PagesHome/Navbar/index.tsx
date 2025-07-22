import React from 'react';
import HamburgerMenu from '../HamburgerMenu';

export const NavBar: React.FC<any> = () => {
    return (
        <div style={styles.input}>
            <div style={styles.divLabel}>
                <label style={styles.label}>HOME</label>
                <label style={styles.label}>INVESTMENT</label>
                <label style={styles.label}>BILL</label>
            </div>
            <div style={styles.divLabel}>
                <HamburgerMenu />
            </div>
        </div>
    );
};

const styles: any = {
    input: {
        marginTop: "30px",
        width: "400px",
        height: "25px",
        padding: "10px",
        borderRadius: "30px",
        border: "none",
        outline: "none",
        boxShadow: "2px 2px 5px #222",
        backgroundColor: "#d3d3d3",
        fontSize: "1em",
        display: "flex",
        justifyContent: "space-between"
    },
    label: {
        textAlign: "center",
        marginLeft: "10px"
    },
    divLabel: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    },
}
