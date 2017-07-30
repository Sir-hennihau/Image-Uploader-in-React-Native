import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './App';

class ImageUploader extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ImageUploader', () => ImageUploader);
