import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse as faHouseSolid, faHashtag, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faHouse as faHouseRegular } from '@fortawesome/free-regular-svg-icons';
import { AlphaIcon } from '../../ui/Icons/SortIcons';
import './styles.css';


const BottomNav = ({ showFavorites, onToggleFavorites, onSortClick, onHomeClick, sortBy }) => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/' && !showFavorites;

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${isHomeActive ? 'active' : ''}`} onClick={onHomeClick}>
        <div className="nav-icon">
          <FontAwesomeIcon icon={isHomeActive ? faHouseSolid : faHouseRegular} />
        </div>
        <span>Home</span>
      </button>

      <button className={`nav-item ${showFavorites ? 'active' : ''}`} onClick={onToggleFavorites}>
        <div className="nav-icon">
          <FontAwesomeIcon icon={showFavorites ? faStarSolid : faStarRegular} />
        </div>
        <span>Favoritos</span>
      </button>

      <button className="nav-item" onClick={onSortClick}>
        <div className="nav-icon">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sortBy}
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}
            >
              {sortBy === 'name' ? (
                <AlphaIcon />
              ) : (
                <FontAwesomeIcon icon={faHashtag} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <span>Filtro</span>
      </button>
    </nav>
  );
};

export default BottomNav;
