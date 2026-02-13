import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import pageNotFoundAnimation from '../../assets/pageNotFound.json';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-animation">
          <Lottie 
            animationData={pageNotFoundAnimation} 
            loop={true} 
          />
        </div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          Oops! This route doesn't exist in the Pokédex.
        </p>
        <button className="not-found-btn" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
