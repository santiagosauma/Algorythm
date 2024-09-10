import React, {Component} from 'react';
import "./App.css";
import Bar from './components/Bar.js';
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forwards from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';
import { Forward } from '@material-ui/icons';

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
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
      currentStep: 0,
    });
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep:0
    })
  }

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar 
        key={index} 
        index={index}
        length={value} 
        color={0}
        changeArray={this.changeArray}
        />
    );
    });

      let playButton;

      if(this.state.arraySteps.length === this.state.currentStep) {
        playButton = (
          <button className="controller">
            <RotateLeft />
          </button>
        );
      } else {
        playButton = (
          <button className="controller">
            <Play />
          </button>
        );
      }

    return (
      <div className='app'>
        <div className = "frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller">
              <Backward />
            </button>
            {playButton}
            <button className="controller">
              <Forwards />
            </button>
          </div>
        </div>
        <div className="pannel"></div>
      </div>
    );
  }
}

export default App;