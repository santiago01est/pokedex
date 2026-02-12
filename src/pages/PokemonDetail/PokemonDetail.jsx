import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faWeightHanging, faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_POKEMON_DETAIL } from '../../services/queries';
import TypeBadge from '../../components/Pokemon/TypeBadge/TypeBadge';
import './styles.css';
import Pokeball from '../../assets/Pokeball.svg';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id) }
  });

  if (loading) return (
    <div className="detail-loading-overlay">
      <div className="loader"></div>
      <p>Buscando en la base de datos...</p>
    </div>
  );

  if (error) return (
    <div className="detail-error">
      <p>Error al cargar el Pokémon: {error.message}</p>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );

  const pokemon = data?.pokemon?.[0];
  if (!pokemon) return null;

  const mainType = pokemon.pokemontypes[0]?.type.name || 'normal';
  const apiColor = pokemon.pokemonspecy?.pokemoncolor?.name || mainType;
  const themeColor = apiColor; // We can use one or the other

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  
  const flavorText = pokemon.pokemonspecy?.pokemonspeciesflavortexts[0]?.flavor_text.replace(/\f/g, ' ') || '';

  const statsMap = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD'
  };

  return (
    <div className={`pokemon-detail-page theme-${themeColor}`}>
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className="detail-name">{pokemon.name}</h1>
        <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
      </header>

      <div className="pokeball-bg-detail">
        <img className="pokeball-icon" src={Pokeball} alt="Pokeball" />
      </div>

      <div className="detail-hero">
        <button className="nav-arrow left" onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)} disabled={pokemon.id <= 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <img src={imageUrl} alt={pokemon.name} className="detail-image" />
        <button className="nav-arrow right" onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <main className="detail-card">
        <div className="detail-types">
          {pokemon.pokemontypes.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>

        <section className="about-section">
          <h2 className={`section-title color-${themeColor}`}>About</h2>
          <div className="about-grid">
            <div className="about-item">
              <div className="item-value">
                <FontAwesomeIcon icon={faWeightHanging} className="icon" />
                {pokemon.weight / 10} kg
              </div>
              <span className="item-label">Weight</span>
            </div>
            <div className="about-item divider">
              <div className="item-value">
                <FontAwesomeIcon icon={faRulerVertical} className="icon" />
                {pokemon.height / 10} m
              </div>
              <span className="item-label">Height</span>
            </div>
            <div className="about-item">
              <div className="moves-list">
                {pokemon.pokemonmoves.map(m => (
                  <span key={m.move.name} className="move-name">{m.move.name}</span>
                ))}
              </div>
              <span className="item-label">Moves</span>
            </div>
          </div>
          <p className="detail-description">{flavorText}</p>
        </section>

        <section className="stats-section">
          <h2 className={`section-title color-${themeColor}`}>Base Stats</h2>
          <div className="stats-container">
            {pokemon.pokemonstats.map((s) => (
              <div key={s.stat.name} className="stat-row">
                <span className={`stat-label color-${themeColor}`}>
                  {statsMap[s.stat.name] || s.stat.name.toUpperCase()}
                </span>
                <span className="stat-value">{String(s.base_stat).padStart(3, '0')}</span>
                <div className="stat-bar-bg">
                  <div 
                    className={`stat-bar-fill bg-${themeColor}`} 
                    style={{ width: `${(s.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PokemonDetail;
