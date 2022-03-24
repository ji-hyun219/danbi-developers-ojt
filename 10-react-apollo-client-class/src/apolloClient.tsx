import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import React from "react";

const link = createHttpLink({
  uri: "http://localhost:5006",
});

const cache = new InMemoryCache();

export const client = new ApolloClient({ link, cache });

export function ApolloFiProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
