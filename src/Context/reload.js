
import React, { createContext, useContext, useState } from 'react';

// Crie o contexto


export const ReloadContext = createContext();

// Crie um provedor de contexto que envolve sua aplicação
export const ReloadProvider = ({ children }) => {
  const [Atualizar, setAtualizar] = useState(true);

  const toggleAtualizar = () => {
    setAtualizar((prevState) => !prevState);
  };

  return (
    <ReloadContext.Provider value={{ Atualizar, toggleAtualizar }}>
      {children}
    </ReloadContext.Provider>
  );
};