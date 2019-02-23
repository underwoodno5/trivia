const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    questions(categories: [Int]): Question!
    favoriteColor: AllowedColor
    avatar(borderColor: Int): Int
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

  enum AllowedColor {
    RED
    GREEN
    BLUE
  }
`;

module.exports = typeDefs;
