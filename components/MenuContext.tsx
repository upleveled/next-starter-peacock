'use client';

import { createContext, useContext } from 'react';

interface MenuContextProps {
  menuOpen: boolean;
  toggleMenuOpen: () => void;
}

export const menuContext = createContext<MenuContextProps>({
  menuOpen: false,
  toggleMenuOpen: () => {
    /** */
  },
});

export function useMenuContext() {
  return useContext(menuContext);
}

export const MenuProvider = menuContext.Provider;
