// Card.js
import React from 'react';
import hiddenImage from '../images/reversecard.jpg'; // Importez l'image de dos de carte

const Card = ({ image, onClick, flipped }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <img src={flipped ? image : hiddenImage} alt="Card" className={flipped ? 'card-image-flipped' : 'card-image'} />
    </div>
  );
};

export default Card;
