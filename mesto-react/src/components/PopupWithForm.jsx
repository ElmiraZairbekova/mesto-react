import React from 'react';

const PopupWithForm = ({name, isOpen, buttonText, onClose, children, title }) => {
    return (
        <div className={`popup popup_form_${name} ${isOpen ? `popup_active`: ""}`} >
          <div className="popup__container">
            <form className="popup__form" name={name} noValidate>
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="popup__submit  popup__confirm" type="submit" title="Сохранить">{buttonText}</button>
            </form>
            <button className="popup__close" type="button" title="Закрыть" onClick={onClose}/>
          </div>
        </div>
    );
};

export default PopupWithForm;


