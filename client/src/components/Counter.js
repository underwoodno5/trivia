import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.addOne = this.addOne.bind(this);
  }

  addOne() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.addOne}>Increment</button>
        {this.state.counter}
      </div>
    );
  }
}

export default Counter;
