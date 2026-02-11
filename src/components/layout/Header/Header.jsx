import SearchBar from '../../Inputs/Search/SearchBar';
import './styles.css';

const Header = ({ searchQuery, setSearchQuery, searchError, onSortClick, showFavorites, onToggleFavorites, onHomeClick }) => {
  return (
    <header className="pokedex-header">
      <div className="header-top">
        <div className="logo-section" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <div className="pokeball-icon">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.41.04-.81.1-1.2h4.51c.36.96 1.29 1.64 2.39 1.64s2.03-.68 2.39-1.64h4.51c.06.39.1.79.1 1.2 0 4.41-3.59 8-8 8zm8.9-9.2H16.3c-.32-1.35-1.53-2.36-2.98-2.36s-2.66 1.01-2.98 2.36H4.11c-.07-.39-.11-.79-.11-1.2 0-3.9 2.84-7.14 6.57-7.83V7.2c0 .44.36.8.8.8s.8-.36.8-.8V3.97c3.73.69 6.57 3.93 6.57 7.83 0 .41-.04.81-.11 1.2z"/>
            </svg>
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
