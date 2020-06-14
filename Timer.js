import React, { Component } from "react";

class Timer extends Component {
  state = {
    date: null,
  };

  currentTime() {
    let offset = this.props.currentZone - this.props.queryZone;
    let time = Math.floor(new Date().getTime()/1000.0);
    let l = time * 1000 - offset * 1000;
    var s = new Date(l).toLocaleTimeString("en-il");
    console.log()
    this.setState({
      date: s,
    });
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {   
    setInterval(() => this.currentTime(), 1000);
  }

  render() {
    return (
      <div>
        {this.state.date ? this.state.date.toString() : "loading.."}
      </div>
    );
  }
}

export default Timer;
