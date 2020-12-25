import React, {Component} from 'react';

class InputTime extends Component
{
	render()
	{
  		return (
  			<div style={{marginLeft:100}}>
  			<h3>Input your desired time:</h3>
  			<input type="number" value={this.props.value} onChange={this.props.handleChange} required />
  			</div>
  		);
   	}
}

export default InputTime;