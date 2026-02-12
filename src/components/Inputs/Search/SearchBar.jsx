import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const SearchBar = ({ value, onChange, error, placeholder = "Search" }) => {
  return (
    <div className="search-bar-container">
      <div className="search-icon">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange('')}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      {error && <span className="search-error">{error}</span>}
    </div>
  );
};

export default SearchBar;
