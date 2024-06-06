/* eslint-disable @typescript-eslint/no-explicit-any */
// create a modal provider

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({});

export const ModalContextProvider = ({ children }: { children: any }) => {
  const [type, setType]: [
    string,
    (type: string) => void
  ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState("");

  const openModal = (type: string, id?: string) => {
    setType(type);
    if (id)
      setId(id);
    setIsOpen(true);
  }

  const closeModal = () => {
    setType("");
    setId("");
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ type, isOpen, openModal, closeModal, id }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
}