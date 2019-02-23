import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//Converts HTML code to readable
import he from 'he';

//---------- GraphQL Query
const AnswersQuery = gql`
  query Questions($categories: [Int]) {
    questions(categories: $categories) {
      results {
        correct_answer
        incorrect_answers
        question
        category
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
      teamAName: 'Team A',
      teamBName: 'Team B',
      addClass: false,
      correctAnswer: false,
      incorrectAnswer: false,
      correctStore: '',
      flipCard: false,
      turnA: true,
      categories: [12, 9, 10, 11],
      list: [12, 9, 10, 11],
      showModal: false,
      checked: true,
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
    this.scoreReset = this.scoreReset.bind(this);
    this.modal = this.modal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.check = this.check.bind(this);
  }

  //toggling state for visible objects
  toggle() {
    this.setState({
      addClass: !this.state.addClass,
      flipCard: !this.state.flipCard
    });
    console.log(this.state.categories);
  }

  //toggle modal
  modal() {
    this.setState({
      showModal: !this.state.showModal
    });
    console.log(this.state.showModal);
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

  scoreReset() {
    this.setState({
      counterTeamA: 0,
      counterTeamB: 0
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
      this.setState({
        counterTeamA: this.state.counterTeamA + 1,
        turnA: false
      });
    } else {
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
      this.setState({
        turnA: false
      });
    } else {
      this.setState({
        turnA: true
      });
    }
    this.setState({ incorrectAnswer: !this.state.incorrectAnswer });
  }

  //handle form enter
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      teamAName: this.elementA.value,
      teamBName: this.elementB.value,
      showModal: !this.state.showModal
    });
  }

  check(event) {
    const array = this.state.list;
    const number = parseInt(event.target.value);

    if (this.state.checked) {
      console.log('uncheck');
      const index = array.indexOf(number);
      if (index > -1) {
        array.splice(index, 1);
      }
      this.setState({
        checked: false
      });
      console.log(array);
    } else {
      console.log('check');
      array.push(number);
      this.setState({
        checked: true
      });
      console.log(array);
    }
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
    let modalOpen = ['modal'];
    if (!this.state.showModal) {
      modalOpen.push('hide-modal');
    }
    const { categories } = this.state;
    return (
      <div className='trivia-container'>
        <Query query={AnswersQuery} variables={{ categories }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.questions.results.map(
              ({ correct_answer, incorrect_answers, question, category }) => (
                <div>
                  <div className={fadeClass.join(' ')}>
                    <div className='question' key={question}>
                      <h2>-{category}</h2>
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
                  <div className='form-group'>
                    <div className='custom-control custom-switch'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='customSwitch2'
                        defaultChecked
                        onChange={this.check}
                        value={9}
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='customSwitch2'
                      >
                        General Knowledge
                      </label>
                      <button
                        type='button'
                        onClick={() =>
                          this.setState({
                            categories: this.state.list
                          })
                        }
                      >
                        Set
                      </button>
                    </div>
                  </div>
                </div>
              )
            );
          }}
        </Query>

        <div>
          <div className='options'>
            <button onClick={this.modal}>
              <i className='fas fa-cog' />
            </button>
          </div>
          <div className={modalOpen.join(' ')}>
            <div className='modal-content'>
              <span className='close'>
                <button onClick={this.modal}>&times;</button>
              </span>
              <form onSubmit={this.handleSubmit}>
                <label className='col-form-label col-form-label-sm'>
                  Team Names
                </label>
                <input
                  type='text'
                  name='teamA'
                  className='form-control form-control-sm'
                  ref={el => (this.elementA = el)}
                />
                <input
                  type='text'
                  name='teamB'
                  className='form-control form-control-sm'
                  ref={el => (this.elementB = el)}
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-primary'
                />
              </form>
              <button
                className='score-reset btn btn-danger'
                onClick={this.scoreReset}
              >
                Reset scores
              </button>
            </div>
          </div>
        </div>

        <div className='score-container'>
          <div className='score'>
            <h2>{this.state.teamAName}</h2>
            {this.state.counterTeamA}
          </div>
          <div className='score'>
            <h2>{this.state.teamBName}</h2>
            {this.state.counterTeamB}
          </div>
        </div>
      </div>
    );
  }
}

export default Answers;
