import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse as faHouseSolid, faHashtag, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faHouse as faHouseRegular } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '../../Inputs/Search/SearchBar';
import Button from '../../Buttons/common/Button';
import { AlphaIcon } from '../../ui/Icons/SortIcons';
import './styles.css';
import Pokeball from '../../../assets/Pokeball.svg';


const Header = ({ searchQuery, setSearchQuery, searchError, onSortClick, showFavorites, onToggleFavorites, onHomeClick, sortBy }) => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/' && !showFavorites;

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
            <Button 
              variant="secondary" 
              className={`nav-btn ${isHomeActive ? 'active' : ''}`} 
              onClick={onHomeClick} 
              aria-label="Home"
              style={{ padding: 0, width: '40px', height: '40px', borderRadius: '50%' }}
            >
              <FontAwesomeIcon icon={isHomeActive ? faHouseSolid : faHouseRegular} />
            </Button>
            <Button 
              variant="secondary" 
              className={`fav-toggle-btn ${showFavorites ? 'active' : ''}`} 
              onClick={onToggleFavorites}
              aria-label="Favorites"
              style={{ padding: 0, width: '40px', height: '40px', borderRadius: '50%' }}
            >
              <FontAwesomeIcon icon={showFavorites ? faStarSolid : faStarRegular} />
            </Button>
            <Button 
              variant="secondary" 
              className="sort-btn" 
              onClick={onSortClick} 
              aria-label="Sort"
              style={{ padding: 0, width: '40px', height: '40px', borderRadius: '50%' }}
            >
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
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
