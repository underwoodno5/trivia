import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Answers from './components/Answers';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <h1 className='title'>Trivia</h1>
        </div>
        <Answers />
      </ApolloProvider>
    );
  }
}

export default App;
