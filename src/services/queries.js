import { gql } from '@apollo/client/core';

export const GET_POKEMON_LIST = gql`
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
`;

export const GET_POKEMON_DETAIL = gql`
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
`;
