import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../../redux/slices/favoritesSlice';

// Helper to render with dependencies
const renderWithProviders = (ui, { preloadedState = {} } = {}) => {
  const store = configureStore({
    reducer: { favorites: favoritesReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

// Mock the navigate function
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
  };

  it('should render pokemon name and id', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('should navigate to detail page when clicked', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    
    const card = screen.getByText('bulbasaur').closest('.pokemon-card-v2');
    fireEvent.click(card);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/pokemon/1');
  });

  it('should show the pokemon image with correct src', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    
    const img = screen.getByAltText('bulbasaur');
    expect(img).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
  });
});
