import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import { useEffect, useState } from 'react';
import Clarifai from 'clarifai';
import { API_KEY } from '../key.js';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';

const app = new Clarifai.App({ apiKey: API_KEY });
const defaultUserStatus = {
  id: '',
  name: '',
  password: '',
  email: '',
  entries: 0,
  joined: '',
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([{}]);
  const [route, setRoute] = useState('sign-in');
  const [allUsers, setAllUsers] = useState([{}]);
  const [currentUser, setCurrentUser] = useState(defaultUserStatus);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetch('http://localhost:8080/');
      const jsonUsers = await users.json();
      setAllUsers(jsonUsers);
    };
    fetchUsers();
  }, [currentUser]);

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleButtonSubmit = () => {
    setImageUrl(input);
    const fetchResponse = async () => {
      try {
        const res = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
        displayFaceLocations(calculateFaceLocations(res));
        updateRankings();
      } catch (error) {
        console.log('An error ocurred:' + error);
      }
    };
    const updateRankings = async () => {
      const updatedUser = await fetch('http://localhost:8080/image', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser),
      });
      const jsonUser = await updatedUser.json();
      setCurrentUser(jsonUser);
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

    const boxesArray = facesLocation.map((faceLocation) => {
      return {
        leftCol: faceLocation.left_col * width,
        topRow: faceLocation.top_row * height,
        rightCol: width - faceLocation.right_col * width,
        bottomRow: height - faceLocation.bottom_row * height,
      };
    });
    return boxesArray;
  };

  const displayFaceLocations = (boxes) => {
    setBoxes(boxes);
  };

  const handleRouteChange = (route) => setRoute(route);
  const handleUpdateUser = (user) => setCurrentUser(user);
  const handleLogout = () => {
    setImageUrl('');
    setBoxes([{}]);
    setInput('');
    setCurrentUser(defaultUserStatus);
  };
  const currentRanking =
    allUsers
      .sort((a, b) => b.entries - a.entries)
      .findIndex(({ name }) => name === currentUser.name) + 1;
  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation
        onRouteChange={handleRouteChange}
        route={route}
        onLogout={handleLogout}
      />
      {route === 'sign-in' && (
        <SignIn
          onUpdateUser={handleUpdateUser}
          onRouteChange={handleRouteChange}
        />
      )}
      {route === 'home' && (
        <>
          <Logo />
          <Rank currentUser={currentUser} ranking={currentRanking} />
          <ImageLinkForm
            value={input}
            onInputChange={handleInputChange}
            onButtonSubmit={handleButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </>
      )}
      {route === 'register' && (
        <Register
          onRouteChange={handleRouteChange}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

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

export default App;
