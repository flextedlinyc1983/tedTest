/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Login from './Login';



const scenes = Actions.create(
  <Scene key="root">
  <Scene key="login" component={Login} title="Login"/>
{/*          
  <Scene key="register" component={Register} title="Register"/>
  <Scene key="home" component={Home}/>*/}
  </Scene>
);


class tedTest extends Component {
  render() {
    return (
      <Router scenes={scenes}/>
    );

    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Welcome to React Native!
    //     </Text>
    //     <Text style={styles.instructions}>
    //       To get started, edit index.android.js
    //     </Text>
    //     <Text style={styles.instructions}>
    //       Shake or press menu button for dev menu
    //     </Text>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('tedTest', () => tedTest);
