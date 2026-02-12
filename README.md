![Pokedex App Screenshot](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

# 🔴 Pokédex App

A modern, high-performance **Progressive Web App (PWA)** built with **React**, **GraphQL**, and **Framer Motion**.  
This Pokédex offers a smooth, app-like experience to explore the world of Pokémon, featuring real-time data fetching, offline capabilities, and fluid animations.




## ✨ Key Features

- **🔍 Advanced Search & Filter**: Instantly search by name or number, and filter by Pokémon type using an intuitive horizontal scroll interface.
- **⚡ High Performance**: Utilizing **Lazy Loading** for images and Skeleton screens for a seamless user experience during data fetching.
- **📱 PWA & Offline Support**: Installable on mobile and desktop. Loads instantly and works offline (caching strategies implemented via `vite-plugin-pwa`).
- **🎨 Dynamic Theming**: The UI adapts its color palette based on the primary type of the viewed Pokémon.
- **❤️ Favorites System**: Persist your favorite Pokémon using Redux Toolkit & LocalStorage.
- **✨ Fluid Animations**: Powered by `framer-motion` for page transitions, list staggering, and "card deck" navigation effects.
- **📊 Detailed Stats**: View base stats, physical attributes, and move sets in a clean, card-based layout.
- **🌗 Sort Options**: Toggle sorting between Name (A-Z) and Pokedex Number (#ID).

## 🛠️ Tech Stack

- **Frontend Core**: [React 18+](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Global state & Favorites)
- **Data & API**: [Apollo Client](https://www.apollographql.com/) (consuming the [PokeAPI via GraphQL](https://graphql.pokeapi.co/v1beta2))
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Responsive Design)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## 📡 API Schema & Queries

The application consumes the [PokeAPI via GraphQL](https://graphql.pokeapi.co/v1beta2).

### 1. Get Pokemon List (`GetPokemonList`)
Fetches a paginated list of Pokemon with basic details for the grid view.

```graphql
query GetPokemonList($limit: Int, $offset: Int, $where: pokemon_bool_exp, $order_by: [pokemon_order_by!]) {
  pokemon(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
    id
    name
    pokemontypes {
      type {
        name
      }
    }
  }
}
```

### 2. Get Pokemon Detail (`GetPokemonDetail`)
Fetches detailed information for a specific Pokemon by ID.

```graphql
query GetPokemonDetail($id: Int!) {
  pokemon(where: { id: { _eq: $id } }) {
    id
    name
    height
    weight
    pokemontypes {
      type {
        name
      }
    }
    pokemonstats {
      base_stat
      stat {
        name
      }
    }
    pokemonmoves(limit: 2) {
      move {
        name
      }
    }
    pokemonspecy {
      pokemoncolor {
        name
      }
      pokemonspeciesflavortexts(where: { language_id: { _eq: 9 } }, limit: 1) {
        flavor_text
      }
    }
  }
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pokedex-app.git
   cd pokedex-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

To create a production-ready build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── Buttons/     # Button variants (Favorite, etc.)
│   ├── Inputs/      # Search, Filter inputs
│   ├── Layout/      # Header, BottomNav, Wrappers
│   ├── Pokemon/     # PokemonCard, TypeBadge
│   └── ui/          # Generic UI (Loader, Skeletons, LazyImage)
├── hooks/           # Custom React hooks
├── pages/           # Page views (Home, PokemonDetail)
├── services/        # API configuration (GraphQL queries, Apollo client)
├── store/           # Redux slices and store configuration
├── styles/          # Global styles, Design Tokens, Reset
└── utils/           # Helper functions (validation, formatting)
```

## 🧪 Running Tests

Run the test suite to ensure everything is working correctly:

```bash
npm run test
```

## 🔮 Future Roadmap

- [ ] **Evolution Chain**: Visualizing the evolution path for each Pokémon.
- [ ] **Abilities & Weaknesses**: Detailed type effectiveness charts.
- [ ] **Infinite Scroll**: For smoother browsing of the full list.
- [ ] **Comparisons**: Compare stats between two different Pokémon.
- [ ] **Internationalization (i18n)**: Support for multiple languages.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
