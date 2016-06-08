'use strict';

var React = require('react');
var QRCode = require('react-native-qrcode');
var {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} = require('react-native');

var QRCodeSample = React.createClass({
    getInitialState: function() {
        return {
            text: 'http://facebook.github.io/react-native/',
        };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                />
                <QRCode
                    value={this.state.text}
                    size={100}
                    // bgColor='purple'
                    bgColor='black'
                    fgColor='white'/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});



module.exports = QRCodeSample;