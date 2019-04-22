import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count: 0,
    on: false,
    x: null,
    y: null
  };

  componentDidMount() {
    document.title = `Clicked ${this.state.count} Times.`;
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentDidUpdate() {
    document.title = `Clicked ${this.state.count} Times.`;
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    });
  };

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

        <h2>Mouse Position</h2>

        <p>X Position: {this.state.x}</p>
        <p>Y Position: {this.state.y}</p>
      </>
    );
  }
}

export default App;
