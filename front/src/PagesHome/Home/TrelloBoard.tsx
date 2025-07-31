import React from 'react';
import './TrelloBoard.css';



const initialCards = [
  { id: 1, text: 'Estudar React' },
  { id: 2, text: 'Ler documentação do projeto' },
  { id: 3, text: 'Implementar tela de login' },
  { id: 4, text: 'Configurar ambiente' },
];


export default function TrelloBoard() {
  const [cards, setCards] = React.useState(initialCards);
  const [draggedIdx, setDraggedIdx] = React.useState<number | null>(null);

  const onDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const newCards = [...cards];
    const [removed] = newCards.splice(draggedIdx, 1);
    newCards.splice(idx, 0, removed);
    setCards(newCards);
    setDraggedIdx(null);
  };

  return (
    <div className="trello-board" style={{ justifyContent: 'center' }}>
      <div className="trello-column">
        <div className="trello-column-title">Lista de Tarefas</div>
        {cards.map((card, idx) => (
          <div
            className="trello-card"
            key={card.id}
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(idx)}
            style={{ opacity: draggedIdx === idx ? 0.5 : 1, cursor: 'grab' }}
          >
            {card.text}
          </div>
        ))}
      </div>
    </div>
  );
}
