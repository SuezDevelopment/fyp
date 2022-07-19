import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'localhost:4000/graphql',
    cache: new InMemoryCache()
});

const ApP = ()=>{
    
}
