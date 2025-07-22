const express = require('express');
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const WebSocketServer  = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { ApolloServer } = require('apollo-server-express');


const db = require('./db');
const {models,getUser} = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const port = process.env.PORT || 5000;


const app = express();
const httpServer = createServer(app);

db.connect();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer.Server({
  server: httpServer,
  path: '/graphql'
});

const serverCleanup = useServer({ schema }, wsServer);


const server = new ApolloServer({
  schema,
  context: ({req}) => {
    //console.log(req);
    const token = req.headers.authorization;
    //console.log("inside context")

    const user = getUser(token);
    

    return {models,user};
  },
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
});




async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  httpServer.listen({ port }, () =>
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
  );
}


startServer();
