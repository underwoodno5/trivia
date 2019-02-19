import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//Converts HTML code to readable
import he from 'he';

//---------- GraphQL Query
const AnswersQuery = gql`
  {
    questions {
      results {
        correct_answer
        incorrect_answers
        question
      }
    }
  }
`;

export class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterTeamA: 0,
      counterTeamB: 0,
      addClass: false,
      correctAnswer: false,
      incorrectAnswer: false,
      turnA: true,
      firstAnswerOrder: Math.floor(Math.random() * 10),
      secondAnswerOrder: Math.floor(Math.random() * 10),
      thirdAnswerOrder: Math.floor(Math.random() * 10),
      fourthAnswerOrder: Math.floor(Math.random() * 10)
    };
    this.toggle = this.toggle.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.random = this.random.bind(this);
  }

  //toggling state for visible objects
  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  //toggling state for visible objects and randomising
  random() {
    this.setState({
      addClass: !this.state.addClass,
      firstAnswerOrder: Math.floor(Math.random() * 10),
      secondAnswerOrder: Math.floor(Math.random() * 10),
      thirdAnswerOrder: Math.floor(Math.random() * 10),
      fourthAnswerOrder: Math.floor(Math.random() * 10)
    });
    this.setState({ correctAnswer: !this.state.correctAnswer });
    console.log(this.state.fourthAnswerOrder);
  }

  //Adding one to score and changing team state
  correctAnswer() {
    if (this.state.turnA) {
      console.log('turnA is true');
      this.setState({
        counterTeamA: this.state.counterTeamA + 1,
        turnA: false
      });
    } else {
      console.log('turnA is false');
      this.setState({
        counterTeamB: this.state.counterTeamB + 1,
        turnA: true
      });
    }
    this.setState({ correctAnswer: !this.state.correctAnswer });
  }

  //changing team state
  wrongAnswer() {
    if (this.state.turnA) {
      this.setState({
        turnA: false
      });
    } else {
      this.setState({
        turnA: true
      });
    }
  }

  render() {
    let fadeClass = ['answers-container'];
    if (this.state.addClass) {
      fadeClass.push('fadeOut');
    }

    let showCorrect = ['correct-answer'];
    if (!this.state.correctAnswer) {
      showCorrect.push('fadeOut');
    }

    return (
      <div className='trivia-container'>
        <Query query={AnswersQuery}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.questions.results.map(
              ({ correct_answer, incorrect_answers, question }) => (
                <div>
                  <div className={fadeClass.join(' ')}>
                    <div key={question}>
                      <p>{he.decode(question)}</p>
                    </div>
                    <h1>Answers</h1>
                    <div
                      className='answers card text-white bg-info mb-3'
                      key={correct_answer}
                    >
                      <button
                        type='button'
                        onClick={() => {
                          this.correctAnswer();
                          this.toggle();
                        }}
                        className='btn-primary'
                        style={{ order: this.state.firstAnswerOrder }}
                      >
                        {he.decode(correct_answer)} correct
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          this.toggle();
                          this.wrongAnswer();
                        }}
                        className='btn-primary'
                        style={{ order: this.state.secondAnswerOrder }}
                      >
                        {he.decode(incorrect_answers[0])}
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          this.toggle();
                          this.wrongAnswer();
                        }}
                        className='btn-primary'
                        style={{ order: this.state.thirdAnswerOrder }}
                      >
                        {he.decode(incorrect_answers[1])}
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          this.toggle();
                          this.wrongAnswer();
                        }}
                        className='btn-primary'
                        style={{ order: this.state.fourthAnswerOrder }}
                      >
                        {he.decode(incorrect_answers[2])}
                      </button>
                    </div>
                  </div>
                  <div className={showCorrect.join(' ')}>
                    Correct Answer
                    <button
                      type='button'
                      onClick={() => {
                        refetch();
                        setTimeout(this.random, 500);
                      }}
                      className='btn-success'
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              )
            );
          }}
        </Query>
        <div className='score-container'>
          <div className='score'>
            <h2>Team A</h2>
            {this.state.counterTeamA}
          </div>
          <div className='score'>
            <h2>Team B</h2>
            {this.state.counterTeamB}
          </div>
        </div>
        <div class='scene scene--card'>
          <div class='card'>
            <div class='card__face card__face--front'>front</div>
            <div class='card__face card__face--back'>back</div>
          </div>
        </div>
        <p>Click card to flip.</p>
      </div>
    );
  }
}

export default Answers;
