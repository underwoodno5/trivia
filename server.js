const typeDefs = require('./schema');
const { ApolloServer } = require('apollo-server-express');
const QuestionAPI = require('./datasources/question');
const resolvers = require('./resolvers');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    questionAPI: new QuestionAPI()
  })
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Apollo server running on ${PORT}`);
});
