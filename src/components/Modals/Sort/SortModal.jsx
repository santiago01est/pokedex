import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

// Overlay variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 } 
  }
};

// Modal card variants
const modalVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0,
    y: 10
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.3
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 }
  }
};

const SortModal = ({ selectedSort, onSortChange, onClose }) => {
  const options = [
    { label: 'Number', value: 'id' },
    { label: 'Name', value: 'name' }
  ];

  return (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="sort-modal-card" 
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
      >
        <div className="sort-modal-header">
          <h2 className="sort-modal-title">Sort by:</h2>
        </div>
        <div className="sort-modal-content">
          {options.map((option) => (
            <label key={option.value} className="sort-option">
              <input
                type="radio"
                name="sort-option"
                value={option.value}
                checked={selectedSort === option.value}
                onChange={() => {
                  onSortChange(option.value);
                  setTimeout(onClose, 150); // Small delay to see the selection before closing
                }}
              />
              <div className="radio-custom">
                {selectedSort === option.value && <div className="radio-inner" />}
              </div>
              <span className="option-label">{option.label}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SortModal;
