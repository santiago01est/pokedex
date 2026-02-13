import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faWeightHanging, faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_POKEMON_DETAIL } from '../../services/queries';
import TypeBadge from '../../components/Pokemon/TypeBadge/TypeBadge';
import DetailSkeleton from '../../components/ui/Skeletons/DetailSkeleton';
import './styles.css';
import Pokeball from '../../assets/Pokeball.svg';

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8
  })
};

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const direction = location.state?.direction || 0;
  
  // Use a local state to keep track of the current pokemon data being displayed
  // This allows us to persist the background color/info while loading (if we wanted)
  // But per requirements: card stays white with skeleton.
  
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id) },
    fetchPolicy: 'cache-and-network' // Try cache first, but ensure we get fresh data
  });

  const [displayPokemon, setDisplayPokemon] = useState(null);

  useEffect(() => {
    if (data?.pokemon?.[0]) {
      setDisplayPokemon(data.pokemon[0]);
    }
  }, [data]);

  if (error) return (
    <div className="detail-error">
      <p>Error al cargar el Pokémon: {error.message}</p>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );

  // While loading initially (no displayPokemon), we might want a full screen loader or just wait.
  // But since we want to show skeleton in the white card, we render the structure.
  
  // If we have displayPokemon, we use its color. If loading and no displayPokemon (first load), default.
  // Actually, if we are navigating, we want to KEEP the old color until the new one arrives?
  // Or if we specifically want the skeleton state, we can use the old color.
  
  // However, the prompt implies "white container stays where it is with loader... waiting for info".
  
  const pokemonToUse = displayPokemon;
  const themeColor = pokemonToUse?.pokemontypes[0]?.type.name || 'normal';
  
  const imageUrl = pokemonToUse 
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonToUse.id}.png`
    : null;

  const currentId = parseInt(id);

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
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className="detail-name">{loading ? '' : pokemonToUse?.name}</h1>
        <span className="detail-id">
          {pokemonToUse ? `#${String(pokemonToUse.id).padStart(3, '0')}` : ''}
        </span>
      </header>

      <div className="pokeball-bg-detail">
        <img className="pokeball-icon" src={Pokeball} alt="Pokeball" />
      </div>

      <div className="detail-hero">
        <button 
            className="nav-arrow left" 
            onClick={() => navigate(`/pokemon/${currentId - 1}`, { state: { direction: -1 } })} 
            disabled={currentId <= 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {!loading && imageUrl && (
                    <motion.img 
                        key={currentId}
                        src={imageUrl} 
                        alt={pokemonToUse?.name} 
                        className="detail-image"
                        custom={direction}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    />
                )}
            </AnimatePresence>
        </div>

        <button 
            className="nav-arrow right" 
            onClick={() => navigate(`/pokemon/${currentId + 1}`, { state: { direction: 1 } })}
        >
           <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <main className="detail-card">
        {loading ? (
             <DetailSkeleton />
        ) : (
            <>
                <div className="detail-types">
                  {pokemonToUse?.pokemontypes.map((t) => (
                    <TypeBadge key={t.type.name} type={t.type.name} />
                  ))}
                </div>

                <section className="about-section">
                  <h2 className={`section-title color-${themeColor}`}>About</h2>
                  <div className="about-grid">
                    <div className="about-item">
                      <div className="item-value">
                        <FontAwesomeIcon icon={faWeightHanging} className="icon" />
                        {pokemonToUse?.weight / 10} kg
                      </div>
                      <span className="item-label">Weight</span>
                    </div>
                    <div className="about-item divider">
                      <div className="item-value">
                        <FontAwesomeIcon icon={faRulerVertical} className="icon" />
                        {pokemonToUse?.height / 10} m
                      </div>
                      <span className="item-label">Height</span>
                    </div>
                    <div className="about-item">
                      <div className="moves-list">
                        {pokemonToUse?.pokemonmoves.map(m => (
                          <span key={m.move.name} className="move-name">{m.move.name}</span>
                        ))}
                      </div>
                      <span className="item-label">Moves</span>
                    </div>
                  </div>
                  <p className="detail-description">
                      {pokemonToUse?.pokemonspecy?.pokemonspeciesflavortexts[0]?.flavor_text.replace(/\f/g, ' ') || ''}
                  </p>
                </section>

                <section className="stats-section">
                  <h2 className={`section-title color-${themeColor}`}>Base Stats</h2>
                  <div className="stats-container">
                    {pokemonToUse?.pokemonstats.map((s) => (
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
            </>
        )}
      </main>
    </div>
  );
};

export default PokemonDetail;
