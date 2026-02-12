import './Loader.css';
import Pokeball from '../../../assets/Pokeball.svg';

const Loader = ({ fullPage = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loader-wrapper">
        <div className="loader-circle"></div>
        <img src={Pokeball} alt="Loading..." className="loader-pokeball" />
      </div>
    </div>
  );
};

export default Loader;
