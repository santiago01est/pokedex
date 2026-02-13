import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 
  'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ activeType, onTypeChange }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      // We'll check scroll again after animation, but better to use onScroll event
    }
  };

  return (
    <div className="type-filter-wrapper">
      <button 
        className="scroll-btn left" 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div 
        className="type-filter-container" 
        ref={scrollContainerRef}
        onScroll={checkScroll}
      >
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

      <button 
        className="scroll-btn right" 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default TypeFilter;
