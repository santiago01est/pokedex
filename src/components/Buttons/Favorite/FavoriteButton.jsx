import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../redux/slices/favoritesSlice';
import { useState } from 'react';
import './styles.css';

const FavoriteButton = ({ pokemon }) => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isFavorite = useSelector((state) => 
    state.favorites.items.some((item) => item.id === pokemon.id)
  );

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFavorite) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
    
    dispatch(toggleFavorite(pokemon));
  };

  return (
    <button 
      className={`favorite-btn-star ${isFavorite ? 'is-favorite' : ''} ${isAnimating ? 'animate-pop' : ''}`}
      onClick={handleToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
    </button>
  );
};

export default FavoriteButton;
