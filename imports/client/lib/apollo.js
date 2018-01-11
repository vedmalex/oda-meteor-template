import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { BatchHttpLink } from "apollo-link-batch-http";

export default ({ uri }) => {
  const httpLink = new BatchHttpLink({ uri });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('authToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      }
    });
    return forward(operation);
  })

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
  });
}