import React, {Component} from 'react';

class StartButton extends Component
{
	render()
	{
  		return (<div style={{ marginLeft: 100 }}><button disabled={!this.props.value} onClick={this.props.startCountDown}>Start Timer</button></div>);
   	}
}

export default StartButton;