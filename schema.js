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
