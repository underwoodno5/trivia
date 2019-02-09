const { RESTDataSource } = require('apollo-datasource-rest');

class TriviaApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://opentdb.com/api.php';
  }
  async getAllTrivia() {
    const response = await this.get('?amount=10');
    return response;
    // ? response.map(question => this.questionReducer(question))
    //: [];
  }
  questionReducer(question) {
    return {
      category: question.results.category,
      difficulty: question.results.difficulty,
      question: question.results.question,
      correct_answer: question.results.correct_answer,
      incorrect_answers: question.results.incorrect_answers,
      response_code: question.response_code
    };
  }
}

module.exports = TriviaApi;
