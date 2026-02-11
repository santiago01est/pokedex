import './styles.css';

const SortModal = ({ selectedSort, onSortChange, onClose }) => {
  const options = [
    { label: 'Number', value: 'id' },
    { label: 'Name', value: 'name' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sort-modal-card" onClick={(e) => e.stopPropagation()}>
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
                  onClose();
                }}
              />
              <span className="radio-custom"></span>
              <span className="option-label">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortModal;
