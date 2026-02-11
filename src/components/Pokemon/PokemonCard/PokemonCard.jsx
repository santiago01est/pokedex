import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../Buttons/Favorite/FavoriteButton';
import './styles.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name } = pokemon;
  const navigate = useNavigate();
  
  // Official artwork URL
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card-v2" onClick={() => navigate(`/pokemon/${id}`)}>
      <FavoriteButton pokemon={pokemon} />
      <div className="card-id">#{String(id).padStart(3, '0')}</div>
      <div className="card-image-wrapper">
        <img 
          src={imageUrl} 
          alt={name} 
          loading="lazy"
          className="pokemon-card-image"
        />
        <div className="card-image-bg"></div>
      </div>
      <div className="card-footer">
        <span className="pokemon-card-name">{name}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
