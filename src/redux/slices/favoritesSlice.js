import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [], // Array of pokemon objects or IDs
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const pokemon = action.payload;
            const index = state.items.findIndex((item) => item.id === pokemon.id);

            if (index >= 0) {
                // Remove if exists
                state.items.splice(index, 1);
            } else {
                // Add if not exists
                state.items.push(pokemon);
            }
        },
        clearFavorites: (state) => {
            state.items = [];
        }
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
