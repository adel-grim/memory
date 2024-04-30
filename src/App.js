// App.js
import React, { useState, useEffect } from 'react';
import Title from '../src/components/title';
import Button from '../src/components/button';
import Card from '../src/components/card';
import './App.css';




const images = [
  require('../src/images/dracolossejpg.jpg'),
  require('../src/images/givrali.jpg'),
  require('../src/images/noctali.jpg'),
  require('../src/images/pikachu.jpg'),
  require('../src/images/rayquaza.jpg'),
  require('../src/images/suicune.jpg'),
  // Ajoutez ici autant d'images que nécessaire
];


const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialCards = images.reduce((acc, image) => {
      acc.push({ image, id: acc.length + 1 });
      acc.push({ image, id: acc.length + 1 });
      return acc;
    }, []);
    setCards(shuffle(initialCards));
  };

  const shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleClick = id => {
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 500);
    }

    if (flippedCards.length < 2) {
      const alreadyFlipped = flippedCards.includes(id);
      if (!alreadyFlipped) {
        setFlippedCards([...flippedCards, id]);
        setMoves(moves + 1);
      }
    }
  };

  const checkForMatch = () => {
    const [card1, card2] = flippedCards;
    if (cards[card1].image === cards[card2].image) {
      setMatchedCards([...matchedCards, card1, card2]);
    }
    setFlippedCards([]);
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    initializeGame();
  };

  const isCardFlipped = id => flippedCards.includes(id) || matchedCards.includes(id);

  const isGameWon = cards.length === matchedCards.length;

  return (
    <div className="app">
      <Title>Pokemon cards memory game</Title>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            onClick={() => handleClick(index)}
            flipped={isCardFlipped(index)}
          />
        ))}
      </div>
      <div className="game-info">
        <p>Moves: {moves}</p>
        {isGameWon && <p>Felicitations, vous avez gagné !</p>}
        <Button onClick={resetGame}>Restart</Button>
      </div>
    </div>
  );
};

export default App;



