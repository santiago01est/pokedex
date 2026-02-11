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
      <svg 
        viewBox="0 0 24 24" 
        fill={isFavorite ? "#FFC107" : "none"} 
        stroke={isFavorite ? "#FFC107" : "#DC0A2D"} 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
