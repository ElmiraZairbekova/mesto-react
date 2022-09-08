//  Импортируем библиотеки  //
import React from 'react';

//  Импортируем логотип для вставки в src  //
import logo from '../images/logo.svg';

//  Рендерим компонент JSX компонента шапки  //
const Header = () => {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />
    </header>
  );
};

//  Экспортируем компонент  //
export default Header;
