import React, {useState} from 'react'

// Компоненты
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// Стили
import '../index.css';

function App() {
  // Хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

// Обработчики
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };



  return (
  
    <div className="root">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm title="Редактировать профиль" name="editProfile" buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>

            <input className="popup__input popup__input_type_name"
              type="text" name="name" id="name-input"
              placeholder="Имя" required
              minLength="2" maxLength="40" />
            <span className="name-input-error popup__input-error"></span>
            <input className="popup__input popup__input_type_description" type="text"
              name="description" id="description-input" placeholder="О себе"
              required minLength="2" maxLength="200" />
            <span className="description-input-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="addCard" buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input className="popup__input popup__input_type_title" type="text"    
              id="place-input" name="name" placeholder="Название" 
              required minLength="2" maxLength="30" />
            <span className="place-input-error popup__input-error"></span>
            <input className="popup__input popup__input_type_link" type="url"        
              id="place-input-link" name="link" placeholder="Ссылка на картинку" required />
            <span className="place-input-link-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm  title="Обновить аватар" name="updateAvatar" buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input className="popup__input" type="url" id="avatar"
              name="url" placeholder="Ссылка на аватар" required />
            <span className="popup__input-error avatar-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </div>
  );
}

export default App;