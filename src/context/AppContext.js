import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.find(f => f.id === action.payload.id)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFavorite = (movie) => dispatch({ type: 'ADD_FAVORITE', payload: movie });
  const removeFavorite = (id) => dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  const isFavorite = (id) => state.favorites.some(f => f.id === id);

  return (
    <AppContext.Provider value={{ state, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}