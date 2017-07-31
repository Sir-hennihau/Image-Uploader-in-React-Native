import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';


import ImagePicker from 'react-native-image-picker';

// ---FYI---

// Replace the API URI in the 2 different fetch methods with your own API URI
// Repo includes an example server API "./API/upload.php", feel free to use your own one though
// If you use my "upload.php", go check the FYI included in "upload.php"

// Tested only on Android yet, contact me if you need iOS support

export default class App extends React.Component {
  // States are the file URIs, used for previews in render()
  state = {
    avatarSource: null,
    videoSource: null,
  };

  // ---Image upload---
  // Options passed to ImagePicker.showImagePicker
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    // ImagePicker invoked, picking an image
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels
      console.log('ImagePicker response: ', response);
      if (response.didCancel) {
        console.log('User cancelled ImagePicker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Saving the URI from response as a variable and a state (state is used in render)
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
        // fetch needs the source as a string, but "source" is an object
        const sourceAsString = source.uri.toString();
        console.log('sourceAsString = ', sourceAsString);

        // For storing the file on a server we cut of the filename and its
        // extension from the file URI
        const fileName = sourceAsString.split('/').pop();
        console.log('filename = ', fileName);

        // Creating new FormData
        const data = new FormData();
        data.append('data', {
          uri: sourceAsString,
          type: 'image/jpeg',
          name: fileName,
        });
        // fetch "post"
        // replace below once with your own API URI
        fetch('http://hendrikhausen.com/hidden/phpupload/upload.php', {
          method: 'post',
          body: data,
        })
        // Logging HTTP response
        .then((res) => {
          console.log(res);
        })
        // Logging any networking errors
        .catch((error) => {
          console.log('An error occured during networking: ', error);
        });
      }
    });
  }
  // ---Video upload---
  // Options passed to ImagePicker.showImagePicker
  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    // ImagePicker invoked, picking a video
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels
      console.log('Video picker response:  = ', response);
      if (response.didCancel) {
        console.log('User cancelled VideoPicker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Saving the URI from response as a variable and a state (state is used in render)
        const source = { uri: response.uri };
        console.log('Source= ', source);
        this.setState({
          videoSource: response.uri,
        });
        // ImagePicker returns a .uri and a .path for videos
        // Need .path to write the correct filename later on
        const path = { path: response.path };
        console.log('Path= ', path);

        // fetch needs the source as a string, "source" is an object
        const sourceAsString = source.uri.toString();
        console.log('Source URI is: ', sourceAsString);

        // For storing the file on a server we cut of the filename and its
        // extension from the file URI
        const fileName = path.path.toString().split('/').pop();
        console.log('The cut filename is: ', fileName);

        // Creating new FormData
        const data = new FormData();
        data.append('data', {
          uri: sourceAsString,
          type: 'video/mp4',
          name: fileName,
        });
        // fetch "post"
        // replace below once with your own API URI
        fetch('http://hendrikhausen.com/hidden/phpupload/upload.php', {
          method: 'post',
          body: data,
        })
        // Logging HTTP response
        .then((res) => {
          console.log(res);
        })
        // Logging any networking errors
        .catch((error) => {
          console.log('An error occured during networking: ', error);
        });
      }
    });
  }

  render() {
    // Stylesheet
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {

        width: 150,
        height: 150,
      },
    });

    return (
      <ScrollView>
        <View style={styles.container}>

          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
              { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
              { this.state.videoSource === null ? <Text>Select a Video</Text> :
              <Text>{ this.state.videoSource }</Text>
              }

            </View>
          </TouchableOpacity>

          <Text>For video, only the selected videoSource/ URI is shown. For a video preview an
           implementation of the external VideoView library would be needed. Would be to much
           for this example.</Text>

        </View>
      </ScrollView>
    );
  }
}

// TODO
// ImagePicker dependencies for iOS
// Test with other file formats then .jpeg and .mp4
