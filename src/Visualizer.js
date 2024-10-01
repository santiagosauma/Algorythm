import React, { Component } from 'react';
import "./App.css";
import BubbleSort from './algorithms/BubbleSort.js';
import Bar from './components/Bar.js';
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forwards from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';

class Visualizer extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    algorithm: 'Bubble Sort',
    timeouts: [],
    changedIndices: [],
  }

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
  }

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.setState({
      timeouts: [],
    })
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey]
    })
  }

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }
    this.setState({
      array: temp,
      arraySteps: [],
      currentStep: 0,
      colorKey: new Array(count).fill(0),
      colorSteps: [],
      changedIndices: [],
    }, () => {
      this.generateSteps();
    });
  };

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = [];
    let colorSteps = [];

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps
    })
  }

  changeArray = (index, value) => {
    let arr = [...this.state.array];
    arr[index] = value;

    let colorKey = [...this.state.colorKey];
    colorKey[index] = 0;

    this.setState(prevState => ({
      array: arr,
      arraySteps: [],
      currentStep: 0,
      colorKey: colorKey,
      colorSteps: [],
      changedIndices: prevState.changedIndices.includes(index) ? prevState.changedIndices : [...prevState.changedIndices, index]
    }), () => {
      this.generateSteps();
    });
  }

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    if (steps.length === 0) return;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        if (currentStep < steps.length) {
          this.setState({
            array: steps[currentStep],
            colorKey: colorSteps[currentStep],
            currentStep: currentStep + 1,
          });
        }
      }, this.state.delay * i);
      timeouts.push(timeout);
      i++;
    }
    this.setState({
      timeouts: timeouts
    })
  }

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={this.state.colorKey[index]}
          changeArray={this.changeArray}
        />
      );
    });

    let playButton;

    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.generateRandomArray}>
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className='app'>
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forwards />
            </button>
          </div>
        </div>
        <div className="pannel"></div>
      </div>
    );
  }
}

export default Visualizer;
