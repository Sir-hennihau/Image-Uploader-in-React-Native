
import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './App';

class ImageUpload extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ImageUpload', () => ImageUpload);
