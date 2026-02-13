import './styles.css';

/**
 * Common Primary Button component for the Pokédex app.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label or content
 * @param {Function} props.onClick - Click handler
 * @param {'primary' | 'secondary' | 'outline'} props.variant - Visual style
 * @param {string} props.className - Extra classes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - HTML button type
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`pokedex-btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
