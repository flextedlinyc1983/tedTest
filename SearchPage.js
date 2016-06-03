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
  ActivityIndicatorIOS
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Login from './Login';
import HelloWorld from './HelloWorld';
var ScrollingMenu = require('react-native-scrolling-menu');
import ProgressBar from 'ProgressBarAndroid';

import SearchResults from './SearchResults';

const scenes = Actions.create(
  <Scene key="root">
  <Scene key="login" component={Login} title="Login"/>
{/*          
  <Scene key="register" component={Register} title="Register"/>
  <Scene key="home" component={Home}/>*/}
  </Scene>
);


const items = ['Menu Item 1','Menu Item 2','Menu Item 3','Menu Item 4','Menu Item 5'];

export default class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    }

    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    this.onSearchPressed = this.onSearchPressed.bind(this);

    this.onLocationPressed = this.onLocationPressed.bind(this);
  }

  onSearchTextChanged(event) {
    // console.log('onSearchTextChanged');
    // console.log(this.state.searchString);
    this.setState({ searchString: event.nativeEvent.text });
    // console.log(this.state.searchString);
  }


  _executeQuery(query) {
    console.log(query);
    // this.setState({ isLoading: true });
    this.setState({
      isLoading: true
    });

    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
       this.setState({
         isLoading: false,
         message: 'Something bad happened ' + error
       })
     );
  }


  _handleResponse(response) {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      // console.log('Properties found: ' + response.listings.length);

      this.props.navigator.push({
        name: 'Results',
        component: SearchResults,
        params: {listings: response.listings}
      });

    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }



  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude;
        this.setState({ searchString: search });
        var query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      });
  }


  onClick(inputName) {
    // console.log("Selected: "  + inputName);
  }

  render() {

    var spinner = this.state.isLoading ?
      // ( <ActivityIndicatorIOS size='large' />) :
      ( <ProgressBar styleAttr="Large" /> ) :
      ( <View/>);



    /*return (
      <Router scenes={scenes}/>
    );*/
    // console.log('SearchPage.render');
    // console.log(this.state.searchString);
    return (
    /*
      <ScrollingMenu
          items={items}
          // callback={this.onClick.bind(this)}
          backgroundColor="#ffffff"
          textColor="#cccccc"
          selectedTextColor="#000000"
          itemSpacing={20} />
      */
      
      <View style={styles.container}>        
        
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>

        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>

        <View style={styles.flowRight}>

          <TextInput
            onChange={this.onSearchTextChanged}
            style={styles.searchInput}
            value={this.state.searchInput}
            placeholder='Search via name or postcode'/>

          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLocationPressed}
            >
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image
        style={styles.image}
        source={require('./Resources/house.png')}
        />
        {spinner}
        <Text style={styles.description}>
          {this.state.message}
        </Text>
      </View>      



    );
  }
}


function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};



const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'    
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 0,
    marginRight: 0,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',

  },
  image: {
  width: 217,
  height: 138
  }
});


