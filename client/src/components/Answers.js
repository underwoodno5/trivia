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
      correctStore: '',
      flipCard: false,
      turnA: true,
      firstAnswerOrder: Math.floor(Math.random() * 10),
      secondAnswerOrder: Math.floor(Math.random() * 10),
      thirdAnswerOrder: Math.floor(Math.random() * 10),
      fourthAnswerOrder: Math.floor(Math.random() * 10)
    };
    this.toggle = this.toggle.bind(this);
    this.toggleChecks = this.toggleChecks.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.random = this.random.bind(this);
  }

  //toggling state for visible objects
  toggle() {
    this.setState({ addClass: !this.state.addClass });
    this.setState({ flipCard: !this.state.flipCard });
  }

  //toggling state for visible objects and randomising
  random() {
    this.setState({
      firstAnswerOrder: Math.floor(Math.random() * 10),
      secondAnswerOrder: Math.floor(Math.random() * 10),
      thirdAnswerOrder: Math.floor(Math.random() * 10),
      fourthAnswerOrder: Math.floor(Math.random() * 10)
    });
  }

  //toggle off correct or incorrect
  toggleChecks() {
    this.setState({
      correctAnswer: false,
      incorrectAnswer: false
    });
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
    this.setState({ flipCard: !this.state.flipCard });
    this.setState({ correctAnswer: !this.state.correctAnswer });
  }

  //changing team state
  wrongAnswer() {
    if (this.state.turnA) {
      console.log('turnA is true');
      this.setState({
        turnA: false
      });
    } else {
      console.log('turnA is false');
      this.setState({
        turnA: true
      });
    }
    this.setState({ incorrectAnswer: !this.state.incorrectAnswer });
  }

  render() {
    let fadeClass = ['answers-container'];
    if (this.state.addClass) {
      fadeClass.push('fadeOut');
    }

    let flipCorrect = ['flipcard'];
    if (this.state.flipCard) {
      flipCorrect.push('is-flipped');
    }

    let showCorrect = ['correct'];
    if (!this.state.correctAnswer) {
      showCorrect.push('hide');
    }

    let showIncorrect = ['incorrect'];
    if (!this.state.incorrectAnswer) {
      showIncorrect.push('hide');
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
                    <div className='question' key={question}>
                      <h2>-question</h2>
                      <p>{he.decode(question)}</p>
                    </div>
                    <h2>-answers</h2>
                  </div>
                  <div className={flipCorrect.join(' ')}>
                    <div className='flipcard'>
                      <div className='flipcard__face flipcard__face--front'>
                        <button
                          key={correct_answer}
                          type='button'
                          onClick={() => {
                            this.correctAnswer();
                            this.toggle();
                            setTimeout(refetch, 500);
                          }}
                          className='btn-primary correctanswer'
                          style={{ order: this.state.firstAnswerOrder }}
                        >
                          {he.decode(correct_answer)}
                        </button>
                        <button
                          key={incorrect_answers[0]}
                          type='button'
                          onClick={() => {
                            this.setState({
                              correctStore: correct_answer
                            });
                            this.toggle();
                            this.wrongAnswer();
                            setTimeout(refetch, 500);
                          }}
                          className='btn-primary'
                          style={{ order: this.state.secondAnswerOrder }}
                        >
                          {he.decode(incorrect_answers[0])}
                        </button>
                        <button
                          key={incorrect_answers[1]}
                          type='button'
                          onClick={() => {
                            this.setState({
                              correctStore: correct_answer
                            });
                            this.toggle();
                            this.wrongAnswer();
                            setTimeout(refetch, 500);
                          }}
                          className='btn-primary'
                          style={{ order: this.state.thirdAnswerOrder }}
                        >
                          {he.decode(incorrect_answers[1])}
                        </button>
                        <button
                          key={incorrect_answers[2]}
                          type='button'
                          onClick={() => {
                            this.setState({
                              correctStore: correct_answer
                            });
                            this.toggle();
                            this.wrongAnswer();
                            setTimeout(refetch, 500);
                          }}
                          className='btn-primary'
                          style={{ order: this.state.fourthAnswerOrder }}
                        >
                          {he.decode(incorrect_answers[2])}
                        </button>
                      </div>
                      <div className='flipcard__face flipcard__face--back'>
                        <div className={showCorrect.join(' ')}>
                          <h3>Correct!</h3>
                          <svg
                            className='checkmark'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 52 52'
                          >
                            <circle
                              className='checkmark__circle'
                              cx='26'
                              cy='26'
                              r='25'
                              fill='none'
                            />
                            <path
                              className='checkmark__check'
                              fill='none'
                              d='M14.1 27.2l7.1 7.2 16.7-16.8'
                            />
                          </svg>
                        </div>
                        <div className={showIncorrect.join(' ')}>
                          <h3>Incorrect: </h3>
                          <p>
                            {he.decode(this.state.correctStore)} was the right
                            answer!
                          </p>
                          <svg
                            className='exmark'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 52 52'
                          >
                            <circle
                              className='exmark__circle'
                              cx='26'
                              cy='26'
                              r='25'
                              fill='none'
                            />
                            <path
                              className='checkmark__check'
                              fill='none'
                              d='M16 16 36 36 M36 16 16 36'
                            />
                          </svg>
                        </div>
                        <div>
                          <button
                            type='button'
                            onClick={() => {
                              setTimeout(this.random, 300);
                              setTimeout(this.toggle, 500);
                              setTimeout(this.toggleChecks, 900);
                            }}
                            className='flipbutton'
                          >
                            Next Question
                          </button>
                        </div>
                      </div>
                    </div>
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
      </div>
    );
  }
}

export default Answers;
