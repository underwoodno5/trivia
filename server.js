//const express = require('express');
//const graphqlHTTP = require('express-graphql');
const typeDefs = require('./schema');
const { ApolloServer } = require('apollo-server');
const QuestionAPI = require('./datasources/question');
const resolvers = require('./resolvers');
const cors = require('cors');

//const schema = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    questionAPI: new QuestionAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

/*const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));*/
