module.exports = {
  Query: {
    questions: async (_, __, { dataSources }) =>
      dataSources.questionAPI.getAllTrivia()
  }
};
