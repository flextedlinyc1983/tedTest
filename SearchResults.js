'use strict';
 

import React, { Component } from 'react'; 
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

import PropertyView from './PropertyView';
import CheckBox from 'react-native-checkbox';
export default class SearchResults extends Component {

  

  // static defaultProps = {
  // 	listings: React.PropTypes.object,
  // };
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings),
      checked: true
    };
  }
 
	renderRow(rowData, sectionID, rowID) {
	  var price = rowData.price_formatted.split(' ')[0];
	 // console.log(rowData.thumb_url);
	  return (
	    <TouchableHighlight onPress={() => this.rowPressed(rowData.thumb_url)}
	        underlayColor='#dddddd'>
	      <View>
	        <View style={styles.rowContainer}>
	          <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
	          <View  style={styles.textContainer}>
	            <Text style={styles.price}>£{price}</Text>
	            <Text style={styles.title}
	                  numberOfLines={1}>{rowData.title}</Text>
	          </View>
	          <CheckBox
	          	  labelStyle = {styles.checkbox}
	          	  labelBefore = 'true'
				  label='Label'
				  checked={this.state.checked}
				  onChange={(checked) => {
				  	console.log('I am checked', checked);
				  	this.setState({
				  		checked: checked
				  	});
				  }}
				/>
	        </View>
	        <View style={styles.separator}/>
	      </View>
	    </TouchableHighlight>
	  );
	}
	rowPressed(propertyGuid) {
	  // console.log(propertyGuid);

	  var property = this.props.listings.filter(prop => prop.thumb_url === propertyGuid)[0];
	 // console.log(property);
	  this.props.navigator.push({
	    title: "Property",
	    component: PropertyView,
	    params: {property: property}
	  });
	}
  render() {
  	console.log('checked:', this.state.checked);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}


var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  checkbox: {
    fontSize: 20,
    color: '#c357b5'
  },
  
});
