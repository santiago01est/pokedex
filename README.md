![Pokedex App Screenshot](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

# 🔴 Pokédex App

A modern, high-performance **Progressive Web App (PWA)** built with **React**, **GraphQL**, and **Framer Motion**.  
This Pokédex offers a smooth, app-like experience to explore the world of Pokémon, featuring real-time data fetching, offline capabilities, and fluid animations.

🌐 **Live Demo**: [https://pokedex-53abd.web.app](https://pokedex-53abd.web.app)

## 📋 Project Requirements

This application was built to fulfill the following requirements:

| Requirement | Status | Details |
|---|---|---|
| Consume external API (PokeAPI GraphQL) | ✅ | Apollo Client with offset-based pagination |
| List view with Pokémon cards | ✅ | Responsive grid (2-6 columns), lazy-loaded images |
| Detail view per Pokémon | ✅ | Stats, moves, types, description, physical attributes |
| Search by name | ✅ | Real-time search with input validation |
| Filter by type | ✅ | Horizontal scrollable type badges |
| Sort (Name / ID) | ✅ | Modal with sort options |
| Favorites system (persist) | ✅ | Redux Toolkit + LocalStorage via redux-persist |
| Infinite scroll | ✅ | IntersectionObserver + Apollo `fetchMore` |
| Responsive design (mobile-first) | ✅ | Mobile bottom nav, desktop header actions |
| Animations & transitions | ✅ | Framer Motion page transitions, card stagger, card-deck navigation |
| PWA & offline support | ✅ | Service Worker via `vite-plugin-pwa` |
| Scroll & state persistence | ✅ | HomeStateContext preserves position & filters on navigation |

## ✨ Key Features

### 🏠 Home Page
- **🔄 Infinite Scroll**: Loads Pokémon in batches of 20 using `IntersectionObserver` (React best practice) with Apollo Client's `fetchMore` and offset-based cache merging. Includes a 1-second animated Pokéball loader between batches.
- **🔍 Advanced Search & Filter**: Instantly search by name and filter by Pokémon type using an intuitive horizontal scroll interface.
- **🌗 Sort Options**: Toggle sorting between Name (A-Z) and Pokédex Number (#ID) via a modal.
- **📌 Sticky Header**: The header stays fixed at the top while scrolling through the Pokémon grid.
- **💾 State Persistence**: Search query, active filters, sort order, and scroll position are preserved when navigating to a Pokémon's detail and returning. No re-loading, no scroll jump.

### ❤️ Favorites
- **Persistent Storage**: Favorite Pokémon are saved to `localStorage` via Redux Toolkit + `redux-persist`, surviving page reloads and app closures.
- **Dedicated View**: Toggle between the full list and your favorites using the star icon in the header (desktop) or bottom navigation (mobile).
- **Filters Apply**: Search and type filters work on your favorites list too.
- **Visual Feedback**: Filled star icon (★) indicates you're viewing favorites; outlined star (☆) for the full list.

### 📊 Detail Page
- **Dynamic Theming**: The UI adapts its color palette based on the Pokémon's primary type.
- **Card-Deck Navigation**: Swipe between Pokémon with animated transitions (slide left/right with spring physics).
- **Skeleton Loading**: White detail card stays in place with skeleton placeholders while data loads.
- **Back Navigation**: Returns to the exact scroll position in the Home list.

### ⚡ Performance & UX
- **Lazy Loading**: Images load progressively with placeholder skeletons.
- **Apollo Cache**: Previously fetched Pokémon are served instantly from cache.
- **PWA & Offline Support**: Installable on mobile and desktop. Loads instantly with cached assets.
- **Responsive Design**: Mobile-first with dedicated bottom navigation bar; desktop uses header action buttons.

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | [React 18+](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + `redux-persist` |
| **Data & API** | [Apollo Client](https://www.apollographql.com/) → [PokeAPI GraphQL](https://graphql.pokeapi.co/v1beta2) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Styling** | Vanilla CSS (CSS Variables, Flexbox/Grid, Responsive) |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |
| **Hosting** | [Firebase Hosting](https://firebase.google.com/docs/hosting) |
| **PWA** | `vite-plugin-pwa` (Service Worker, Precaching) |

## 📡 API Schema & Queries

The application consumes the [PokeAPI via GraphQL](https://graphql.pokeapi.co/v1beta2).

### 1. Get Pokemon List (`GetPokemonList`)
Fetches a paginated list of Pokémon with basic details for the grid view. Supports `offset`-based pagination for infinite scroll, dynamic filtering (`where`), and sorting (`order_by`).

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

**Apollo Cache Policy:**
```javascript
pokemon: {
    keyArgs: ["where", "order_by"],
    merge(existing = [], incoming, { args }) {
        const offset = args?.offset ?? 0;
        if (offset === 0) return incoming;
        return [...existing, ...incoming];
    },
}
```

### 2. Get Pokemon Detail (`GetPokemonDetail`)
Fetches detailed information for a specific Pokémon by ID, including stats, moves, species data, and flavor text (English).

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

## 🏗️ Architecture Overview

```
src/
├── apollo/          # Apollo Client config (cache policies, HTTP link)
├── assets/          # Static assets (images, Lottie animations)
├── components/      # Reusable UI components
│   ├── Buttons/     # Button variants (Favorite)
│   ├── Inputs/      # SearchBar, TypeFilter
│   ├── layout/      # Header, BottomNav
│   ├── Modals/      # SortModal
│   ├── Pokemon/     # PokemonCard, TypeBadge
│   └── ui/          # Loader, Skeletons, LazyImage, Icons
├── context/         # React Contexts
│   ├── HomeStateContext.jsx   # Persists Home state across navigation
│   └── ThemeContext.jsx       # Theme provider
├── hooks/           # Custom React hooks
├── pages/           # Page views
│   ├── Home/        # Home page (grid, infinite scroll)
│   └── PokemonDetail/  # Detail page (stats, navigation)
├── redux/           # Redux store & slices
│   └── slices/      # favoritesSlice (persisted)
├── services/        # GraphQL queries
├── styles/          # Global styles, Design Tokens (tokens.css), Reset
└── utils/           # Helper functions (validation, formatting)
```

### Key Architectural Decisions

- **HomeStateContext**: A dedicated React Context that preserves the Home page's state (search, filters, sort, scroll position) when the component unmounts during route transitions. This avoids the need to refetch data or lose the user's scroll position.
- **IntersectionObserver**: The infinite scroll uses a sentinel `div` at the bottom of the grid observed via `IntersectionObserver` with callback refs — the idiomatic React approach. Refs (`useRef`) track mutable state to avoid stale closures inside the observer callback.
- **Apollo Cache Merge**: The `keyArgs` configuration ensures that pagination doesn't create separate cache entries for each page. Instead, results are merged into a single array per unique `where` + `order_by` combination.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/santiago01est/pokedex.git
   cd pokedex
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

### Deployment (Firebase)

```bash
npm run build
firebase deploy
```

## 🧪 Running Tests

Run the test suite to ensure everything is working correctly:

```bash
npm run test
```

## 🔮 Future Roadmap

- [ ] **Evolution Chain**: Visualizing the evolution path for each Pokémon.
- [ ] **Abilities & Weaknesses**: Detailed type effectiveness charts.
- [x] ~~**Infinite Scroll**~~: Implemented with IntersectionObserver + Apollo fetchMore.
- [ ] **Comparisons**: Compare stats between two different Pokémon.
- [ ] **Internationalization (i18n)**: Support for multiple languages.
- [ ] **Dark Mode**: Toggle between light and dark themes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
