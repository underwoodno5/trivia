const typeDefs = require('./schema');
const { ApolloServer } = require('apollo-server');
const QuestionAPI = require('./datasources/question');
const resolvers = require('./resolvers');
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
