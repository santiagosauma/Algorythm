import React, {Component} from 'react';
import "./App.css";

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

    console.log(temp);

  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default App;