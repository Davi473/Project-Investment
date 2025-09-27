import React from 'react';
import './style.css';

export default function TrelloBoard() {
    const [output, setOutput] = React.useState<boolean>(false)
    const [draggedIdx, setDraggedIdx] = React.useState<number | null>(null);

    const onDragStart = (idx: number) => {
        setDraggedIdx(idx);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // const onDrop = (idx: number) => {
    //     if (draggedIdx === null || draggedIdx === idx) return;
    //     const newCards = [...output];
    //     const [removed] = newCards.splice(draggedIdx, 1);
    //     newCards.splice(idx, 0, removed);
    //     setOutput(newCards);
    //     setDraggedIdx(null);
    // };

    return (
        <div className="trello-board" style={{ justifyContent: 'center' }}>
            <div className="trello-column">
                <div className="trello-column-title">Lista de Tarefas</div>
                {/* {output.map((card: any, idx: any) => (
                    <div
                        className="trello-card"
                        key={card.id}
                        draggable
                        onClick={() => {
                            console.log(output);
                        }}
                        onDragStart={() => onDragStart(idx)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(idx)}
                        style={{ opacity: draggedIdx === idx ? 0.5 : 1, cursor: 'grab' }}
                    >
                        <span className="trello-card-text">{card.text}</span>
                    </div>
                ))} */}
            </div>
        </div>
    );
}
