import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputTime from './inputTime.js';
import StartButton from './startButton.js';
import Timer from './Timer.js';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = { seconds: '00', value: '', isClicked: false }; // seconds holds current seconds, value holds current minute value, isClicked holds button state
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  // handle button clicks to enable/disable it
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  // decrement minutes and seconds
  tick()
  {
    var min = Math.floor(this.secondsRemaining / 60); // get remaining minutes left
    var sec = this.secondsRemaining - (min * 60); // get remaining seconds left

    // set display
    this.setState({
      value: min,
      seconds: sec,
    });

    // append 0 to seconds digit if less than 10
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds, // show state.seconds as current second
      });
    }
    // append 0 to minutes digit if less than 10
    if (min < 10) {
      this.setState({
        value: "0" + min, // show state.value as current minute
      });
    }

    // if countdown has finished, stop running tick function
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
    // decrement seconds
    this.secondsRemaining--
  }

  // start Timer if button is clicked
  startCountDown() {
    // run tick function after every second only
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value; // get user entered minute value
    this.secondsRemaining = time * 60; // convert it to seconds as well to get total seconds
    // set button clicked state to true
    this.setState({
      isClicked : true
    });
  }

  render() {
    const clicked = this.state.isClicked;
    if(clicked)
    {
      // if button is already clicked show timer only
      return (<div className="App">
            <Timer value = {this.state.value} seconds = {this.state.seconds}></Timer>
            </div>); 
    }
    else
    {
      // if button not already clicked, show user input field 
      return (<div className="App">
            <InputTime value={this.state.value} handleChange={this.handleChange}></InputTime>
            <Timer value={this.state.value} seconds={this.state.seconds}></Timer>
            <StartButton startCountDown={this.startCountDown} value={this.state.value}></StartButton>
            </div>);
    }
    
  }
}

export default App;

