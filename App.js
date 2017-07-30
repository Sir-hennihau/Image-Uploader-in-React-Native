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
  };
  // Image tapped
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // fetch needs the source as a string, "source" is counted as an object
        const sourceAsString = JSON.stringify(source);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Change state to uri
        this.setState({
          avatarSource: source,
        });
        console.log('State set.');

        // Creating new FormData
        const data = new FormData();

        console.log('Source URI is: ', sourceAsString);
        data.append('data', {
          uri: 'file:///storage/emulated/0/Android/data/com.imageuploader/files/Pictures/image-e526b6a1-65d8-4ab7-8f39-5520976a7112.jpg',
          type: 'image/jpeg', // or photo.type
          name: 'datei.jpeg',
        });
        data.append('name', 'testName'); // you can append anyone.

        // fetch to url
        fetch('http://hendrikhausen.com/hidden/phpupload/upload.php', {
          method: 'post',
          body: data,
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log('Network error is: ', error);
        });
      }
    });
  }
  // Video tapped
  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
         // Change state to uri
        this.setState({
          videoSource: response.uri,
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
            <Image style={styles.avatar} source={{ uri: 'file:///storage/emulated/0/Android/data/com.imageuploader/files/Pictures/image-e526b6a1-65d8-4ab7-8f39-5520976a7112.jpg' }} />
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
