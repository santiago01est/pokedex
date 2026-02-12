import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHashtag, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import './styles.css';

const BottomNav = ({ showFavorites, onToggleFavorites, onSortClick, onHomeClick }) => {
  return (
    <nav className="bottom-nav">
      <button className="nav-item" onClick={onHomeClick}>
        <div className="nav-icon">
          <FontAwesomeIcon icon={faHouse} />
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
          <FontAwesomeIcon icon={faHashtag} />
        </div>
        <span>Filtro</span>
      </button>
    </nav>
  );
};

export default BottomNav;
