import React, { Component } from 'react';
import "./styles/Visualizer.css";
import BubbleSort from './algorithms/BubbleSort.js';
import MergeSort from './algorithms/MergeSort.js'
import QuickSort from './algorithms/QuickSort.js'
import Bar from './Bar.js';

class Visualizer extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    speed: 1,
    algorithm: 'Quick Sort',
    timeouts: [],
    isPlaying: false,
    volumeLevel: 100,
    remainingSteps: []
  }

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort,

  }

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.setState({
      timeouts: [],
      isPlaying: false,
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
      temp.push(this.generateRandomNumber(50, 300));
    }
    this.setState({
      array: temp,
      arraySteps: [],
      currentStep: 0,
      colorKey: new Array(count).fill(0),
      colorSteps: [],
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
    }), () => {
      this.generateSteps();
    });
  }

  start = () => {
    let steps = this.state.arraySteps;

    if (steps.length === 0 || this.state.isPlaying) return;

    this.clearTimeouts();

    this.setState({
      remainingSteps: steps.slice(this.state.currentStep),
    }, () => {
      this.playSteps(this.state.remainingSteps, this.state.currentStep);
    });
  }

    playSteps = (steps, startStep) => {
      let timeouts = [];
      
      for (let i = 0; i < steps.length; i++) {
        let timeout = setTimeout(() => {
          let currentStep = startStep + i;
          if (currentStep < this.state.arraySteps.length) {
            this.setState({
              array: steps[i],
              colorKey: this.state.colorSteps[currentStep],
              currentStep: currentStep + 1,
            });
          }
          if (currentStep === this.state.arraySteps.length - 1) {
            this.setState({
              isPlaying: false
            });
          }
        }, (this.state.delay / this.state.speed) * i);
        timeouts.push(timeout);
      }
      this.setState({
        timeouts: timeouts,
        isPlaying: true,
      })
    }

  pause = () => {
    this.clearTimeouts();
    this.setState({
      isPlaying: false
    });
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

  toggleVolume = () => {
    let newVolumeLevel;
    if (this.state.volumeLevel === 100) {
      newVolumeLevel = 50;
    } else if (this.state.volumeLevel === 50) {
      newVolumeLevel = 0;
    } else {
      newVolumeLevel = 100;
    }
    this.setState({
      volumeLevel: newVolumeLevel
    });
  }

  getVolumeIcon = () => {
    if (this.state.volumeLevel === 100) {
      return '/resources/volume-up.png';
    } else if (this.state.volumeLevel === 50) {
      return '/resources/volume50.png';
    } else {
      return '/resources/mute.png';
    }
  }

  changeSpeed = () => {
    let newSpeed;
    switch (this.state.speed) {
      case 1:
        newSpeed = 1.5;
        break;
      case 1.5:
        newSpeed = 2;
        break;
      case 2:
        newSpeed = 0.5;
        break;
      default:
        newSpeed = 1;
        break;
    }
    this.setState({ speed: newSpeed }, () => {
      if (this.state.isPlaying) {
        this.clearTimeouts();
        this.playSteps(this.state.arraySteps.slice(this.state.currentStep), this.state.currentStep);
      }
    });
  };

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

    if (this.state.isPlaying) {
      playButton = (
        <button className="controller central" onClick={this.pause}>
          <img src={process.env.PUBLIC_URL + '/resources/pause.png'} alt="Pause" />
        </button>
      );
    } else if (this.state.currentStep === this.state.arraySteps.length) {
      playButton = (
        <button className="controller central" onClick={this.generateRandomArray}>
          <img src={process.env.PUBLIC_URL + '/resources/redo-arrow-symbol.png'} alt="Restart" />
        </button>
      );
    } else {
      playButton = (
        <button className="controller central" onClick={this.start}>
          <img src={process.env.PUBLIC_URL + '/resources/play-button-arrowhead.png'} alt="Play" />
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
            <button className="controller transparent-button">
              <span className="text-preview large-text">B</span>
            </button>
            <button className="controller transparent-button">
              <img src={process.env.PUBLIC_URL + '/resources/guitar-instrument.png'} alt="Instrumento" className="large-icon" />
            </button>
            <button className="controller previous central" onClick={this.previousStep}>
              <img src={process.env.PUBLIC_URL + '/resources/next.png'} alt="Previous" />
            </button>
            {playButton}
            <button className="controller central" onClick={this.nextStep}>
              <img src={process.env.PUBLIC_URL + '/resources/next.png'} alt="Next" />
            </button>
            <button className="controller transparent-button" onClick={this.toggleVolume}>
              <img src={process.env.PUBLIC_URL + this.getVolumeIcon()} alt="Volume" className="large-icon" />
            </button>
            <button className="controller transparent-button" onClick={this.changeSpeed}>
              <span className="text-preview large-text">{this.state.speed}x</span>
            </button>
          </div>
        </div>
        <div className="pannel"></div>
      </div>
    );
  }
}

export default Visualizer;
