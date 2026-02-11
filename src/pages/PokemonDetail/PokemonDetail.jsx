import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_POKEMON_DETAIL } from '../../services/queries';
import TypeBadge from '../../components/Pokemon/TypeBadge/TypeBadge';
import './styles.css';

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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="detail-name">{pokemon.name}</h1>
        <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
      </header>

      <div className="pokeball-bg-detail">
        <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.41.04-.81.1-1.2h4.51c.36.96 1.29 1.64 2.39 1.64s2.03-.68 2.39-1.64h4.51c.06.39.1.79.1 1.2 0 4.41-3.59 8-8 8zm8.9-9.2H16.3c-.32-1.35-1.53-2.36-2.98-2.36s-2.66 1.01-2.98 2.36H4.11c-.07-.39-.11-.79-.11-1.2 0-3.9 2.84-7.14 6.57-7.83V7.2c0 .44.36.8.8.8s.8-.36.8-.8V3.97c3.73.69 6.57 3.93 6.57 7.83 0 .41-.04.81-.11 1.2z"/>
        </svg>
      </div>

      <div className="detail-hero">
        <button className="nav-arrow left" onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)} disabled={pokemon.id <= 1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <img src={imageUrl} alt={pokemon.name} className="detail-image" />
        <button className="nav-arrow right" onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" className="icon">
                  <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                  <path d="M12 7v10"></path>
                  <path d="M8 12h8"></path>
                </svg>
                {pokemon.weight / 10} kg
              </div>
              <span className="item-label">Weight</span>
            </div>
            <div className="about-item divider">
              <div className="item-value">
                <svg viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" className="icon">
                  <path d="M12 1v22"></path>
                  <path d="M17 5H7"></path>
                  <path d="M17 19H7"></path>
                </svg>
                {pokemon.height / 10} m
              </div>
              <span className="item-label">Height</span>
            </div>
            <div className="about-item">
              <div className="moves-list">
                {pokemon.pokemonabilities.map(a => (
                  <span key={a.ability.name} className="move-name">{a.ability.name}</span>
                ))}
              </div>
              <span className="item-label">Abilities</span>
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
