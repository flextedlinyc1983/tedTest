'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import SearchPage from './SearchPage';

class tedTest extends React.Component {
  render() {

    var defaultName = 'SearchPage';
    var defaultComponent = SearchPage;

    return (



      
            
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={(route) => {
          // return Navigator.SceneConfigs.VerticalDownSwipeJump;
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }} />
            

    );
  }
}



AppRegistry.registerComponent('tedTest', () => tedTest);
