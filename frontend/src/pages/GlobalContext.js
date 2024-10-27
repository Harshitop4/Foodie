import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [noCartItems, setNoCartItems] = useState(0);

    return (
        <GlobalContext.Provider value={{ noCartItems, setNoCartItems }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
