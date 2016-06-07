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
  Image,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import SearchPage from './SearchPage';

import PanResponderExample from './PanResponderExample';


var navigator;
var count=1;
class tedTest extends React.Component {


  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this);




  }

  componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
          // console.log('navigator.getCurrentRoutes().length' + navigator.getCurrentRoutes().length);
          if (navigator && navigator.getCurrentRoutes().length > 1) {
              count = 1;
              navigator.pop();
              return true;
          }
          if (navigator && navigator.getCurrentRoutes().length == 1 && count >= 1) {
              count--;
              ToastAndroid.show('在按一次退出',ToastAndroid.SHORT);
              return true;
          }
          return false;
        });
  }


  render() {

    var defaultName = 'SearchPage';
    var defaultComponent = SearchPage;
    // var defaultComponent = PanResponderExample;
    // var defaultName = 'PanResponderExample';
    return (





   <Navigator
    ref={(nav) => { navigator = nav; }}
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
    return <Component {...route.params} navigator={navigator} url={'https://www.facebook.com'}/>
  }

  


}



AppRegistry.registerComponent('tedTest', () => tedTest);
