import React, {Component} from 'react';
import "./App.css";
import Bar from './components/Bar.js'

class App extends Component {
  state = {
    array: [],
    arrayStops: [],
    colorKey: [],
    colorStops: [],
    currentStop: 0,
    count: 10,
    delay: 100,
    algorithm: '',
    timeout: [],
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  generateRandomArray = () => {
    const count = this.state.count;
    const temp = [];

    for (let i=0; i < count; i++){
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState({
      array:temp,
      arraySteps: [temp],
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar 
        key={index} 
        index={index}
        length={value} 
        color={0}
        />
    );
    });

    return <div className='app'>
      <div className = "frame">
        <div className="barsDiv container card">{bars}</div>
      </div>
      <div className="control-pannel"></div>
      <div className="pannel"></div>
    </div>
  }
}

export default App;