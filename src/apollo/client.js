import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const httpLink = new HttpLink({
    uri: 'https://graphql.pokeapi.co/v1beta2',
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    //  add pagination or other field policies
                },
            },
        },
    }),
    // Enable source maps in development for easier debugging
    connectToDevTools: import.meta.env.DEV,
});
