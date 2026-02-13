import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHashtag, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '../../Inputs/Search/SearchBar';
import { AlphaIcon } from '../../ui/Icons/SortIcons';
import './styles.css';
import Pokeball from '../../../assets/Pokeball.svg';


const Header = ({ searchQuery, setSearchQuery, searchError, onSortClick, showFavorites, onToggleFavorites, onHomeClick, sortBy }) => {
  return (
    <header className="pokedex-header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo-section" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
            <div>
              <img style={{ width: '62px', height: '62px' }} src={Pokeball} alt="Pokeball" />
            </div>
            <h1 className="header-title">Pokédex</h1>
          </div>
        </div>
        <div className="header-controls">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            error={searchError} 
          />
          <div className="header-actions-btns desktop-only">
            <button className="nav-btn" onClick={onHomeClick} aria-label="Home">
              <FontAwesomeIcon icon={faHouse} />
            </button>
            <button 
              className={`fav-toggle-btn ${showFavorites ? 'active' : ''}`} 
              onClick={onToggleFavorites}
              aria-label="Favorites"
            >
              <FontAwesomeIcon icon={showFavorites ? faStarSolid : faStarRegular} />
            </button>
            <button className="sort-btn" onClick={onSortClick} aria-label="Sort">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={sortBy}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {sortBy === 'name' ? (
                    <AlphaIcon />
                  ) : (
                    <FontAwesomeIcon icon={faHashtag} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
