const typeDefs = require('./schema');
const { ApolloServer } = require('apollo-server');
const QuestionAPI = require('./datasources/question');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  cors: true,
  typeDefs,
  introspection: true,
  playground: true,
  resolvers,
  dataSources: () => ({
    questionAPI: new QuestionAPI()
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
