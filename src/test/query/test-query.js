import { gql } from '@apollo/client/core';

export const TEST_QUERY = gql`
  query TestConnection {
    pokemon(limit: 5, order_by: { id: asc }) {
      id
      name
    }
  }
`;
