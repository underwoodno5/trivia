import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Answers from './components/Answers';

const client = new ApolloClient({
  uri: '/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <h1 className='title'>A SIMPLE TRIVIA GAME</h1>
    </div>
    <Answers />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));

export default App;
