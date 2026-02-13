import Psyduck from '../../../assets/Psyduck.png';
import './styles.css';

const NoResults = ({ title, message, onClear }) => {
  return (
    <div className="no-results-container">
      <div className="no-results-image-wrapper">
        <img src={Psyduck} alt="Psyduck not found" className="no-results-image" />
      </div>
      <h2 className="no-results-title">{title || "Pokémon Not Found"}</h2>
      <p className="no-results-text">
        {message || "Oops! We couldn't find any Pokémon matching your search."}
      </p>
      {onClear && (
        <button className="no-results-btn" onClick={onClear}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default NoResults;
