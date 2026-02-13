import { createContext, useContext, useState, useRef } from 'react';

const HomeStateContext = createContext(null);

export const HomeStateProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeType, setActiveType] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFavorites, setShowFavorites] = useState(false);
  const scrollPositionRef = useRef(0);
  const hasVisitedRef = useRef(false);

  const value = {
    searchQuery, setSearchQuery,
    searchError, setSearchError,
    activeQuery, setActiveQuery,
    activeType, setActiveType,
    sortBy, setSortBy,
    showFavorites, setShowFavorites,
    scrollPositionRef,
    hasVisitedRef,
  };

  return (
    <HomeStateContext.Provider value={value}>
      {children}
    </HomeStateContext.Provider>
  );
};

export const useHomeState = () => {
  const context = useContext(HomeStateContext);
  if (!context) {
    throw new Error('useHomeState must be used within a HomeStateProvider');
  }
  return context;
};
