import './styles.css';

const TypeBadge = ({ type }) => {
  if (!type) return null;
  
  const typeName = type.toLowerCase();
  
  return (
    <span 
      className="type-badge" 
      style={{ '--type-color': `var(--type-${typeName})` }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
