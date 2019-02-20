const typeDefs = require('./schema');
const { ApolloServer } = require('apollo-server');
const QuestionAPI = require('./datasources/question');
const resolvers = require('./resolvers');
const express = require('express');

const app = express();

const server = new ApolloServer({
  cors: true,
  playground: true,
  introspection: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    questionAPI: new QuestionAPI()
  })
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
