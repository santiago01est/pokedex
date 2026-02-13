import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GET_POKEMON_LIST } from '../../services/queries';
import { validateSearch } from '../../utils/validation';
import PokemonCard from '../../components/Pokemon/PokemonCard/PokemonCard';
import Header from '../../components/layout/Header/Header';
import SortModal from '../../components/Modals/Sort/SortModal';
import TypeFilter from '../../components/Inputs/TypeFilter/TypeFilter';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import Loader from '../../components/ui/Loader/Loader';
import './Home.css';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeType, setActiveType] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  
  const favoriteItems = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);
  
  const { loading, error, data } = useQuery(GET_POKEMON_LIST, {
    variables: { 
      limit: 151,
      where: {
        _and: [
          activeQuery ? { name: { _ilike: `%${activeQuery}%` } } : {},
          activeType ? { pokemontypes: { type: { name: { _eq: activeType } } } } : {}
        ]
      },
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
    setActiveType('');
    setShowFavorites(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedFavorites = favoriteItems
    .filter(p => {
      const nameMatch = p.name.toLowerCase().includes(activeQuery.toLowerCase());
      const typeMatch = activeType ? p.pokemontypes?.some(t => t.type.name === activeType) : true;
      return nameMatch && typeMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  const pokemonList = showFavorites ? displayedFavorites : (data?.pokemon || []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
        sortBy={sortBy}
      />
      
      <main className="pokedex-content">
        <div className="pokedex-inner-container">
          <TypeFilter activeType={activeType} onTypeChange={setActiveType} />

          {(loading || !minTimeElapsed) && !showFavorites && <Loader />} 
          
          {error && !showFavorites && <p className="status-msg error">Error: {error.message}</p>}
          
          {((!loading && minTimeElapsed) || showFavorites) && (
            <motion.div 
              key={`${activeType}-${activeQuery}-${showFavorites}-${sortBy}`}
              className="pokemon-grid-v2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {pokemonList.map((p) => (
                <motion.div key={p.id} variants={itemVariants}>
                  <PokemonCard pokemon={p} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && pokemonList.length === 0 && (
            <div className="status-msg">
               <p>{showFavorites ? "No favorites found" : `No Pokemon found`}</p>
               {(activeQuery || activeType) && (
                 <button 
                    className="clear-filters-btn"
                    onClick={() => { setActiveType(''); setSearchQuery(''); setActiveQuery(''); }}
                    style={{ marginTop: '10px', textDecoration: 'underline', color: '#DC0A2D', cursor: 'pointer', background: 'none', border: 'none' }}
                 >
                   Clear filters
                 </button>
               )}
            </div>
          )}
        </div>
      </main>

      <BottomNav 
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onSortClick={() => setIsSortModalOpen(true)}
        onHomeClick={handleHomeClick}
        sortBy={sortBy}
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
