import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHashtag, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '../../Inputs/Search/SearchBar';
import './styles.css';
import Pokeball from '../../../assets/Pokeball.svg';

const Header = ({ searchQuery, setSearchQuery, searchError, onSortClick, showFavorites, onToggleFavorites, onHomeClick }) => {
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
              <FontAwesomeIcon icon={faHashtag} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
