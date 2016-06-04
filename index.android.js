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

import PanResponderExample from './PanResponderExample';

class tedTest extends React.Component {


  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }


  render() {

    var defaultName = 'SearchPage';
    var defaultComponent = SearchPage;
    // var defaultComponent = PanResponderExample;
    // var defaultName = 'PanResponderExample';
    return (


            
      
            
   <Navigator
    initialRoute={{ name: defaultName, component: defaultComponent }}
    configureScene={(route) => {
      // return Navigator.SceneConfigs.VerticalDownSwipeJump;
      return Navigator.SceneConfigs.FloatFromRight;
    }}
        renderScene={this.renderScene} />
              

    );
  }


  renderScene(route, navigator){
    let Component = route.component;
    return <Component {...route.params} navigator={navigator} />
  }


}



AppRegistry.registerComponent('tedTest', () => tedTest);




