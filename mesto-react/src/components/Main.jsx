import React, {useState, useEffect} from 'react';
import Card from './Card';
import { api } from '../utils/api';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      api
        .getUserInfo()
        .then((res) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
        })
        .catch((err) => {
          console.log(err);
        });
  
      api
        .getInitialCards()
        .then((res) => setCards(...cards, res))
        .catch((err) => console.log(err));
    }, []);
  
  
    return (
      <main>
      <section className="profile">
      <div className="profile__container">
          <button className="profile__avatar-edit" type="button" title="Обновить аватар" onClick={onEditAvatar}>
         <img className="profile__avatar" src={userAvatar} alt="фото профиля" />
         </button>
        <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" aria-label="редактировать профиль" onClick={onEditProfile}></button>
              <p className="profile__description">{userDescription}</p>
          </div>
      </div>
      <button className="profile__add-button" type="button" aria-label="добавить фотографию" onClick={onAddPlace}></button>
  </section>
  <section className="elements">

   {cards.map((card) => (
        <Card name={card.name} key={card._id} link={card.link}
        likesCount={card.likes.length} onCardClick={onCardClick} card={card} />
    ))}

  </section>
</main>
);
};
    
  export default Main;