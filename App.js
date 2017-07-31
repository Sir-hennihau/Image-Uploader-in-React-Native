import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
  state = {
    avatarSource: null,
    videoSource: null,
    fileName: null,
  };
  // Image upload
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Change state "avaterSource" to file uri
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
        // fetch needs the source as a string, "source" is an object
        const sourceAsString = source.uri.toString();
        console.log('Source URI is: ', sourceAsString);
        const fileName = sourceAsString.split('/').pop();
        console.log('The cut filename is: ', fileName);
        // Creating new FormData
        const data = new FormData();
        data.append('data', {
          uri: sourceAsString,
          type: 'image/jpeg',
          name: fileName,
        });
        data.append('name', 'testName');
        // fetch "post"
        fetch('http://hendrikhausen.com/hidden/phpupload/upload.php', {
          method: 'post',
          body: data,
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log('An error occured during networking: ', error);
        });
      }
    });
  }
  // Video upload
  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };
    // VideoPicker
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

         // Change state videoSource to file uri
        const source = { uri: response.uri };
        const path = { path: response.path };
        console.log('Source= ', source);
        this.setState({
          videoSource: response.uri,
        });

        // fetch needs the source as a string, "source" is an object
        const sourceAsString = source.uri.toString();
        console.log('Source URI is: ', sourceAsString);

        const fileName = path.path.toString().split('/').pop();
        console.log('The cut filename is: ', fileName);

        // Creating new FormData
        const data = new FormData();
        data.append('data', {
          uri: sourceAsString,
          type: 'video/mp4',
          name: fileName,
        });
        data.append('name', 'testName');
        // fetch "post"
        fetch('http://hendrikhausen.com/hidden/phpupload/upload.php', {
          method: 'post',
          body: data,
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
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
        borderRadius: 75,
        width: 150,
        height: 150,
      },
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
            { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
            }
          </View>
        </TouchableOpacity>
        <Button
          title="ASD"
        />
        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            { this.state.videoSource === null ? <Text>Select a Video</Text> :
            <Text>{ this.state.videoSource }</Text>
            }

          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{ margin: 8, textAlign: 'center' }}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }
}

// TODO
// Image picker dependencies for iOS
