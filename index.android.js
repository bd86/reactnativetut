/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var AwesomeProject = React.createClass({
  
   getInitialState: function() {
    return {
      bounceValue: new Animated.Value(0),
    };
  },

  componentDidMount: function() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.8,
        friction: 1,
      }
    ).start();
  },

  render: function() {
    return (
      <View>
        <Animated.Image                         
          source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
          style={{
            flex: 1,
            transform: [                        
              {scale: this.state.bounceValue},  
            ]
          }}
        />
        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
