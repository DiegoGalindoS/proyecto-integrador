// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(null);

  return (
    <UserContext.Provider value={{ perfil, setPerfil }}>
      {children}
    </UserContext.Provider>
  );
};
