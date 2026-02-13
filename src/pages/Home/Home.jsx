import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { NetworkStatus } from '@apollo/client/core';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GET_POKEMON_LIST } from '../../services/queries';
import { validateSearch } from '../../utils/validation';
import { useHomeState } from '../../context/HomeStateContext';
import PokemonCard from '../../components/Pokemon/PokemonCard/PokemonCard';
import Header from '../../components/layout/Header/Header';
import SortModal from '../../components/Modals/Sort/SortModal';
import TypeFilter from '../../components/Inputs/TypeFilter/TypeFilter';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import Loader from '../../components/ui/Loader/Loader';
import { useDebounce } from '../../hooks/useDebounce';
import './Home.css';

const PAGE_SIZE = 20;
const FETCH_MORE_DELAY = 1000;

export const Home = () => {
  // Persistent state from context (survives navigation)
  const {
    searchQuery, setSearchQuery,
    searchError, setSearchError,
    activeQuery, setActiveQuery,
    activeType, setActiveType,
    sortBy, setSortBy,
    showFavorites, setShowFavorites,
    scrollPositionRef,
    hasVisitedRef,
  } = useHomeState();

  // Local state (resets on mount, that's fine)
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(hasVisitedRef.current);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  // Refs for IntersectionObserver
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const dataLengthRef = useRef(0);
  const observerRef = useRef(null);

  const favoriteItems = useSelector((state) => state.favorites.items);

  // Skip intro loader on subsequent visits
  useEffect(() => {
    if (hasVisitedRef.current) {
      setMinTimeElapsed(true);
      return;
    }
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
      hasVisitedRef.current = true;
    }, 1800);
    return () => clearTimeout(timer);
  }, [hasVisitedRef]);
  
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POKEMON_LIST, {
    variables: { 
      limit: PAGE_SIZE,
      offset: 0,
      where: {
        _and: [
          activeQuery ? { name: { _ilike: `%${activeQuery}%` } } : {},
          activeType ? { pokemontypes: { type: { name: { _eq: activeType } } } } : {}
        ]
      },
      order_by: { [sortBy]: 'asc' }
    },
    skip: showFavorites,
    notifyOnNetworkStatusChange: true,
  });

  const isInitialLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.setVariables;

  // Keep refs in sync
  useEffect(() => { isFetchingRef.current = isFetchingMore; }, [isFetchingMore]);
  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);

  const pokemonCount = data?.pokemon?.length || 0;
  useEffect(() => { dataLengthRef.current = pokemonCount; }, [pokemonCount]);

  // Determine hasMore when data changes
  useEffect(() => {
    if (pokemonCount > 0 && pokemonCount % PAGE_SIZE !== 0) {
      setHasMore(false);
    }
  }, [pokemonCount]);

  // Reset pagination when filters change
  useEffect(() => {
    setHasMore(true);
  }, [activeQuery, activeType, sortBy]);

  // Save scroll position before unmounting
  useEffect(() => {
    return () => {
      scrollPositionRef.current = window.scrollY;
    };
  }, [scrollPositionRef]);

  // Restore scroll position after data loads
  useEffect(() => {
    if (pokemonCount > 0 && scrollPositionRef.current > 0) {
      // Use requestAnimationFrame to ensure DOM is painted
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [pokemonCount, scrollPositionRef]);

  // Sentinel ref callback using IntersectionObserver
  const sentinelRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !isFetchingRef.current
        ) {
          isFetchingRef.current = true;
          setIsFetchingMore(true);

          setTimeout(async () => {
            try {
              const currentLength = dataLengthRef.current;
              const { data: moreData } = await fetchMore({
                variables: {
                  offset: currentLength,
                },
              });
              if (!moreData?.pokemon?.length || moreData.pokemon.length < PAGE_SIZE) {
                hasMoreRef.current = false;
                setHasMore(false);
              }
            } catch (err) {
              console.error('Error fetching more pokemon:', err);
            } finally {
              isFetchingRef.current = false;
              setIsFetchingMore(false);
            }
          }, FETCH_MORE_DELAY);
        }
      },
      { rootMargin: '100px' }
    );

    observerRef.current.observe(node);
  }, [fetchMore]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Debounce the search query to avoid multiple API calls while typing
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    const validation = validateSearch(debouncedSearchQuery);
    if (validation.isValid) {
      setSearchError(null);
      setActiveQuery(validation.value);
    } else {
      setSearchError(validation.error);
    }
  }, [debouncedSearchQuery, setActiveQuery, setSearchError]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    // Validation is now handled by the useEffect watching the debounced value
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setSearchError(null);
    setActiveQuery('');
    setActiveType('');
    setShowFavorites(false);
    scrollPositionRef.current = 0;
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

  const hasData = pokemonCount > 0;
  const showInitialLoader = (isInitialLoading || !minTimeElapsed) && !hasData && !showFavorites;
  const showGrid = (hasData && minTimeElapsed) || showFavorites;

  // Skip entrance animation when returning from detail
  const isReturning = hasVisitedRef.current && scrollPositionRef.current > 0;

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

          {showInitialLoader && <Loader />} 
          
          {error && !showFavorites && <p className="status-msg error">Error: {error.message}</p>}
          
          {showGrid && (
            <div 
              key={`${activeType}-${activeQuery}-${showFavorites}-${sortBy}`}
              className="pokemon-grid-v2"
            >
              {pokemonList.map((p, index) => (
                <motion.div 
                  key={p.id} 
                  initial={isReturning ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: isReturning ? 0 : (index % PAGE_SIZE) * 0.03 }}
                >
                  <PokemonCard pokemon={p} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Sentinel + loading indicator for infinite scroll */}
          {showGrid && hasMore && !showFavorites && (
            <div ref={sentinelRef} className="infinite-scroll-sentinel">
              {isFetchingMore && <Loader small />}
            </div>
          )}

          {!loading && pokemonList.length === 0 && !showInitialLoader && (
            <div className="status-msg">
               <p>{showFavorites ? "No favorites found" : `No Pokemon found`}</p>
               {(activeQuery || activeType) && (
                 <button 
                    className="clear-filters-btn"
                    onClick={() => { setActiveType(''); setSearchQuery(''); setActiveQuery(''); }}
                    style={{ marginTop: '10px', textDecoration: 'underline', color: 'var(--pokedex-red)', cursor: 'pointer', background: 'none', border: 'none' }}
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
