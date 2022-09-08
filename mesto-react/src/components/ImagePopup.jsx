// Импорт библиотеки
import React from 'react';

const ImagePopup = ({ isOpen, card, onClose }) => {
    return (
        <div className={`popup popup_type_view" ${isOpen ? 'popup_active' : ''}`} >
          <div className="popup__content">
            <img className="popup__image" src={card.link} alt={card.name}/>
            <h2 className="popup__description">{card.name}</h2>
            <button className="popup__close" type="button" title="Закрыть" onClick={onClose}/>
          </div>
        </div>
      )
    }

export default ImagePopup;
