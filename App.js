import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,ImageBackground, Text, View } from 'react-native';
import RequireAuth from './helpers/require-auth';
import { Provider } from "react-redux";
import store from './store';
import Loading from './helpers/loading';

const image = { uri: "https://c4.wallpaperflare.com/wallpaper/240/760/50/indoors-bar-interior-design-pub-wallpaper-preview.jpg" }

export default class App extends React.Component {
  state = {
    loaded:false
  }
  constructor(){
    super()
    Loading.load(v => this.setState({loaded: true}));
  }
  render() {
    return (
      <View style={styles.container}>
      {this.state.loaded ? 
      <Provider store={store}>
        <RequireAuth />
      </Provider>
      :
      <ImageBackground source={image} style={styles.image}>
      <Text style={styles.text}>Application starting</Text>
      </ImageBackground>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
    paddingVertical: 15  
  }
});