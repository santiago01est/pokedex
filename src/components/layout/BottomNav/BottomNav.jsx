import './styles.css';

const BottomNav = ({ showFavorites, onToggleFavorites, onSortClick, onHomeClick }) => {
  return (
    <nav className="bottom-nav">
      <button className="nav-item" onClick={onHomeClick}>
        <div className="nav-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span>Home</span>
      </button>

      <button className={`nav-item ${showFavorites ? 'active' : ''}`} onClick={onToggleFavorites}>
        <div className="nav-icon">
          <svg viewBox="0 0 24 24" fill={showFavorites ? "#FFC107" : "none"} stroke={showFavorites ? "#FFC107" : "currentColor"} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <span>Favoritos</span>
      </button>

      <button className="nav-item" onClick={onSortClick}>
        <div className="nav-icon">
          <span className="sort-icon-nav">#</span>
        </div>
        <span>Filtro</span>
      </button>
    </nav>
  );
};

export default BottomNav;
