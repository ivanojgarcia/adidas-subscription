import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config();
import {
    typeDefs,
    resolvers
} from './src/graphql';

// Init Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: false,
  playground: true,
});

// Run the server
server.listen({port: process.env.PORT}).then(({ url }) => {
    console.log(`GraphQL Server ready at ${url}`);
});