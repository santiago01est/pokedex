import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../Buttons/Favorite/FavoriteButton';
import LazyImage from '../../ui/Image/LazyImage';
import TypeBadge from '../../Pokemon/TypeBadge/TypeBadge';
import './styles.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name, pokemontypes } = pokemon;
  const navigate = useNavigate();
  
  // Official artwork URL - using the Pokemon ID
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card-v2" onClick={() => navigate(`/pokemon/${id}`)}>
      <FavoriteButton pokemon={pokemon} />
      <div className="card-id">#{String(id).padStart(3, '0')}</div>
      <div className="card-image-wrapper">
        <LazyImage 
          src={imageUrl} 
          alt={name} 
          className="pokemon-card-image"
        />
        <div className="card-image-bg"></div>
      </div>
      <div className="card-footer">
        <span className="pokemon-card-name">{name}</span>
        {pokemontypes?.length > 0 && (
          <div className="card-types-row">
            {pokemontypes.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
