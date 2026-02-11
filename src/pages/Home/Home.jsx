import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useSelector } from 'react-redux';
import { GET_POKEMON_LIST } from '../../services/queries';
import { validateSearch } from '../../utils/validation';
import PokemonCard from '../../components/Pokemon/PokemonCard/PokemonCard';
import Header from '../../components/Layout/Header/Header';
import SortModal from '../../components/Modals/Sort/SortModal';
import BottomNav from '../../components/Layout/BottomNav/BottomNav';
import './Home.css';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const favoriteItems = useSelector((state) => state.favorites.items);
  
  const { loading, error, data } = useQuery(GET_POKEMON_LIST, {
    variables: { 
      limit: 151,
      where: activeQuery ? { name: { _ilike: `%${activeQuery}%` } } : {},
      order_by: { [sortBy]: 'asc' }
    },
    skip: showFavorites 
  });

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const validation = validateSearch(value);
    
    if (validation.isValid) {
      setSearchError(null);
      setActiveQuery(validation.value);
    } else {
      setSearchError(validation.error);
    }
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setSearchError(null);
    setActiveQuery('');
    setShowFavorites(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedFavorites = favoriteItems
    .filter(p => p.name.toLowerCase().includes(activeQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  const pokemonList = showFavorites ? displayedFavorites : (data?.pokemon || []);

  return (
    <div className="pokedex-app">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={handleSearchChange} 
        searchError={searchError}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onSortClick={() => setIsSortModalOpen(true)} 
        onHomeClick={handleHomeClick}
      />
      
      <main className="pokedex-content">
        <div className="pokedex-inner-container">
          {loading && !showFavorites && <p className="status-msg">Cargando Pokédex...</p>}
          {error && !showFavorites && <p className="status-msg error">Error: {error.message}</p>}
          
          <div className="pokemon-grid-v2">
            {pokemonList.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          {!loading && pokemonList.length === 0 && (
            <p className="status-msg">
              {showFavorites ? "No tienes favoritos guardados" : `No se encontraron Pokémon para "${searchQuery}"`}
            </p>
          )}
        </div>
      </main>

      <BottomNav 
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onSortClick={() => setIsSortModalOpen(true)}
        onHomeClick={handleHomeClick}
      />

      {isSortModalOpen && (
        <SortModal 
          selectedSort={sortBy}
          onSortChange={setSortBy}
          onClose={() => setIsSortModalOpen(false)}
        />
      )}
    </div>
  );
};
