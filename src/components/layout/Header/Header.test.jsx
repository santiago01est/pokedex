import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

// Mock SearchBar to avoid testing its internals here
vi.mock('../../Inputs/Search/SearchBar', () => ({
  default: ({ value, onChange }) => (
    <input 
      data-testid="mock-search" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  )
}));

describe('Header', () => {
  const defaultProps = {
    searchQuery: '',
    setSearchQuery: vi.fn(),
    searchError: null,
    onSortClick: vi.fn(),
    showFavorites: false,
    onToggleFavorites: vi.fn(),
    onHomeClick: vi.fn(),
    sortBy: 'id',
  };

  it('renders the title correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  it('calls onHomeClick when logo is clicked', () => {
    render(<Header {...defaultProps} />);
    const logo = screen.getByText('Pokédex').parentElement;
    fireEvent.click(logo);
    expect(defaultProps.onHomeClick).toHaveBeenCalled();
  });

  it('calls setSearchQuery when search input changes', () => {
    render(<Header {...defaultProps} />);
    const input = screen.getByTestId('mock-search');
    fireEvent.change(input, { target: { value: 'pika' } });
    expect(defaultProps.setSearchQuery).toHaveBeenCalledWith('pika');
  });

  it('calls onToggleFavorites when favorites button is clicked', () => {
    render(<Header {...defaultProps} />);
    const favBtn = screen.getByLabelText('Favorites');
    fireEvent.click(favBtn);
    expect(defaultProps.onToggleFavorites).toHaveBeenCalled();
  });

  it('calls onSortClick when sort button is clicked', () => {
    render(<Header {...defaultProps} />);
    const sortBtn = screen.getByLabelText('Sort');
    fireEvent.click(sortBtn);
    expect(defaultProps.onSortClick).toHaveBeenCalled();
  });
});
