module.exports = {
  Query: {
    questions: async (root, args, { dataSources }) =>
      dataSources.questionAPI.getAllTrivia(args),
    favoriteColor: () => 'RED',
    avatar: (root, args) => args.borderColor
  }
};
