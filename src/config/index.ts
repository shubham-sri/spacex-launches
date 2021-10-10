import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

export const GRAPHQL_URL = `https://api.spacex.land/graphql`

export const GRAPHQL_CLIENT = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache({
        addTypename: false
    })
});
