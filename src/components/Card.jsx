import React from 'react';

const Card = ({ link, name, likesCount, onCardClick, card }) => {
  return (
    <figure className="element">
        <img className="element__image" src={link} alt={name} title={name} onClick={() => onCardClick(card)}/>
        <button className="element__button-trash" type="button" title="Удалить фото"></button>
        <figcaption className="element__info">
            <h2 className="element__title">{name}</h2>
            <div className="element__likes-container">
                <button className="element__button-like" type="button" title="Нравится"></button>
                <p className="element__likes-count">{likesCount}</p>
            </div>
        </figcaption>
</figure>
  );
};

export default Card;