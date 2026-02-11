import { gql } from '@apollo/client/core';

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $where: pokemon_bool_exp, $order_by: [pokemon_order_by!]) {
    pokemon(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      name
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
      id
      name
      height
      weight
      pokemon_types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      species: pokemon_v2_pokemonspecy {
        flavor_texts: pokemon_v2_pokemonflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          flavor_text
        }
      }
    }
  }
`;
