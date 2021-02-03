import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import { useState } from 'react';
import Clarifai from 'clarifai';
import { API_KEY } from '../key.js';

const app = new Clarifai.App({ apiKey: API_KEY });

const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#3CA9D1',
        blur: 5,
      },
    },
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 180,
      },
    },
  },
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleButtonSubmit = () => {
    setImageUrl(input);
    const fetchResponse = async () => {
      try {
        const res = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
        displayFaceLocations(calculateFaceLocations(res));
      } catch (error) {
        console.log('An error ocurred:' + error);
      }
    };
    fetchResponse();
  };

  const calculateFaceLocations = (data) => {
    const facesLocation = data.outputs[0].data.regions.map(
      ({ region_info }) => region_info.bounding_box
    );
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: facesLocation[0].left_col * width,
      topRow: facesLocation[0].top_row * height,
      rightCol: width - facesLocation[0].right_col * width,
      bottomRow: height - facesLocation[0].bottom_row * height,
    };
  };

  const displayFaceLocations = (box) => {
    setBox(box);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        value={input}
        onInputChange={handleInputChange}
        onButtonSubmit={handleButtonSubmit}
      />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
