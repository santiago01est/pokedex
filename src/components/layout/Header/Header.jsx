import SearchBar from '../../Inputs/Search/SearchBar';
import './styles.css';
import Pokeball from '../../../assets/Pokeball.svg';

const Header = ({ searchQuery, setSearchQuery, searchError, onSortClick, showFavorites, onToggleFavorites, onHomeClick }) => {
  return (
    <header className="pokedex-header">
      <div className="header-top">
        <div className="logo-section" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <div className="pokeball-icon">
            <img src={Pokeball} alt="Pokeball" />
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
          <button className={`fav-toggle-btn ${showFavorites ? 'active' : ''}`} onClick={onToggleFavorites}>
            <svg viewBox="0 0 24 24" fill={showFavorites ? "#FFC107" : "none"} stroke={showFavorites ? "#FFC107" : "currentColor"} strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          <button className="sort-btn" onClick={onSortClick}>
            <span className="sort-icon">#</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
