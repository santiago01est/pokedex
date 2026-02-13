import Lottie from 'lottie-react';
import PokeballAnimation from '../../../assets/Pokeball.json';
import './Loader.css';

const Loader = ({ fullPage = false, small = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''} ${small ? 'small' : ''}`}>
      <div className="loader-wrapper">
        <Lottie 
          animationData={PokeballAnimation} 
          loop={true} 
          className="loader-lottie"
        />
      </div>
    </div>
  );
};

export default Loader;
