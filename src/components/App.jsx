import React, { useEffect } from "react";
// Компоненты
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

// Стили
import '../index.css';

function App() {
  // Хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка',
    about: 'Загрузка',
  });
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    });
  }, []);


  function handleUpdateUser(data) {
    setIsLoading(true);
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((e) => console.warn(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
  
    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  };

  function handleCardDelete(card) {
    api.removeCard(card).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  };


  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}


  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };


  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleAvatarUpdate(data) {
    api.updateProfileAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }


  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  useEffect(() => {
    if (isProfilePopupOpened || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isProfilePopupOpened, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddCard={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        
      />

      <Footer />
      <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            isLoading={isLoading}
            onSubmit={handleUpdateUser}
          />

        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onCloseClick={handlePopupCloseClick} 
            onClose={closeAllPopups}
            isLoading={isLoading} 
            onAddSubmit={handleAddPlaceSubmit}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onCloseClick={handlePopupCloseClick} 
            onClose={closeAllPopups} 
            onSubmit={handleAvatarUpdate}
          />


          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;