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
  require('../src/images/golem.jpg'),
  require('../src/images/bruyverne.jpg'),
  require('../src/images/dracaufeu.png'),
  require('../src/images/mewtwo.png'),
];


const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes en secondes

  useEffect(() => {
    initializeGame();
    startTimer();
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
    setTimeLeft(120); // Réinitialiser le temps restant
    initializeGame();
  };

  const startTimer = () => {
    const startTime = Date.now(); // Enregistrer le temps de début
    const timerInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculer le temps écoulé en secondes
      setTimeLeft(prevTime => {
        const remainingTime = 120 - elapsedTime; // Calculer le temps restant
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          if (matchedCards.length !== cards.length) {
            alert("Game over! Vous n'avez pas retourné toutes les cartes à temps.");
          }
          return 0; // Retourner 0 si le temps est écoulé
        } else {
          return remainingTime; // Mettre à jour le temps restant
        }
      });
    }, 1000);
  };  

  const isCardFlipped = id => flippedCards.includes(id) || matchedCards.includes(id);

  const isGameWon = matchedCards.length === cards.length / 2;

  return (
    <div className="app">
      <Title>Pokemon Cards Memory Game</Title>
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
        <div className="move"><p>Moves: {moves}</p></div>
        <div className="timer"><p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p></div> 
        {isGameWon && <p>Bravo vous avez gagné !</p>}
        <Button onClick={resetGame}>Recommencer</Button>
      </div>
    </div>
  );
};

export default App;