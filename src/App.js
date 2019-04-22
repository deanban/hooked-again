import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count: 0,
    on: false
  };

  componentDidMount() {
    document.title = `Clicked ${this.state.count} Times.`;
  }

  componentDidUpdate() {
    document.title = `Clicked ${this.state.count} Times.`;
  }

  incrementCount = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  toggleLight = () => {
    this.setState(({ on }) => ({ on: !on }));
  };

  render() {
    return (
      <>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          Clicked {this.state.count} times.
        </button>

        <h2>Toggle Light</h2>
        <div
          style={{
            height: '50px',
            width: '50px',
            background: this.state.on ? 'yellow' : 'grey'
          }}
          onClick={this.toggleLight}
        />
      </>
    );
  }
}

export default App;
