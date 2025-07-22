import React from 'react';
import { NavBar } from '../Navbar';
import Greeting from '../Greeting';

export const Home: React.FC<any> = () => {
    return (
        <>
            <div style={styles.container}>
                <NavBar />
                <div style={{ height: "50px", width: "320px" }}>
                    <Greeting name={"Fulano"} />
                </div>
            </div>
        </>
    );
};


const styles: any = {
    container: {
        backgroundColor: "#3a3a3a",
        height: "100vh",
        display: "flex",
        flexDirection: "column", // ← isso faz empilhar verticalmente
        alignItems: "center"     // ← corrigido aqui
    },
};