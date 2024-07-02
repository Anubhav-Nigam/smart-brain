import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: '79127cbe5d7f44a2a0594426c2a4561c'
});

const particlesOptions={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      // input: 'https://samples.clarifai.com/face-det.jpg',
      input: '',
      imageUrl: '',
      box: []
    }
  }

  calculateFaceLocation = (data) => {
    console.log('data: ', data);
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // console.log(width, height);
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // }
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    const clarifaiFaces = data.outputs[0].data.regions;
    if(!clarifaiFaces) {
      return [];
    }
    const faces = clarifaiFaces.map((face, i) => {
      let currentFace = face.region_info.bounding_box;
      return {
        leftCol: currentFace.left_col * width,
        topRow: currentFace.top_row * height,
        rightCol: width - (currentFace.right_col * width),
        bottomRow: height - (currentFace.bottom_row * height)
      }
    })
    console.log('faces',faces);
    return faces;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    //   function(response) {
    //     console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    //   },
    //   function(err) {
    //     // there was an error
    //   }
    // );
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
