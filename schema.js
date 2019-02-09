const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    questions: Question!
  }

  type Question {
    response_code: Int
    results: [Results]!
  }

  type Results {
    category: String
    question: String
    difficulty: String
    incorrect_answers: [String]
    correct_answer: String
  }
`;

module.exports = typeDefs;

/*const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const axios = require('axios');

// Trivia types

const ResultsType = new GraphQLObjectType({
  name: 'Results',
  fields: () => ({
    results: { type: new GraphQLList(TriviaQuestion) }
  })
});

const TriviaQuestion = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
    category: { type: GraphQLString },
    correct_answer: { type: GraphQLString },
    question: { type: GraphQLString },
    incorrect_answer: { type: GraphQLString }
  })
});

const IncorrectAnswers = new GraphQLObjectType({
  name: 'Incorrect',
  fields: () => ({
    incorrect_answer: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    questions: {
      type: ResultsType,
      resolve(parent, args) {
        return axios
          .get('https://opentdb.com/api.php?amount=10')
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});*/
