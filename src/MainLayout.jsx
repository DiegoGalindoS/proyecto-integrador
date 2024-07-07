import React from 'react';
import Header from './Header';
import MyList from './to do list/myList';
import ButtonList from './Mylist_button';

function MainLayout() {
  return (
    <>
      <Header />
      <ButtonList buttonText="Mis listas" />
      <ButtonList buttonText="Nueva lista" to="/my-list" />
      
    </>
  );
}

export default MainLayout;
