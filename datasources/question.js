const { RESTDataSource } = require('apollo-datasource-rest');

class TriviaApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://opentdb.com/api.php';
  }

  getAllTrivia(args) {
    const list = args.categories;
    const item = list[Math.floor(Math.random() * list.length)];
    const response = this.get(`?amount=1&type=multiple&category=${item}`);
    return response;
  }
}

module.exports = TriviaApi;
