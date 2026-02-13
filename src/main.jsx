import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { client } from './apollo/client'
import { store, persistor } from './redux/store'

/**
 * Entry point of the Pokédex application.
 * Configures the following providers:
 * - ApolloProvider: GraphQL client for PokeAPI
 * - Provider: Redux store for global state (favorites)
 * - PersistGate: Redux persistence (localStorage)
 * - ThemeProvider: Custom theme context
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
)
