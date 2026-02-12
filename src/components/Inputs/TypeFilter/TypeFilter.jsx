import './styles.css';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 
  'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ activeType, onTypeChange }) => {
  return (
    <div className="type-filter-container">
      <button 
        className={`type-filter-btn ${!activeType ? 'active' : ''}`}
        onClick={() => onTypeChange('')}
      >
        <span>All</span>
      </button>

      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          className={`type-filter-btn ${activeType === type ? 'active' : ''}`}
          style={{ '--type-color': `var(--type-${type})` }}
          onClick={() => onTypeChange(type === activeType ? '' : type)}
        >
          <span className="type-dot"></span>
          <span className="type-name">{type}</span>
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
