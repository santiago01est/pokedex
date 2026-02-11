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
    pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      types {
        type {
          name
        }
      }
      # Generation can be tricky depending on the schema, usually related to species
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
      }
    }
  }
`;
