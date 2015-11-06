'use strict';
//test
var React = require('react-native');
//Check this
var {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  PanResponder
} = React;

var SQUARE_DIMENSIONS = 100;

var AnimatedFlick = React.createClass({
  getInitialState: function() {
    return {
      pan: new Animated.ValueXY()
    };
  },
  componentWillMount: function() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener((Value) => this._animatedValueX = Value.value);
    this.state.pan.y.addListener((Value) => this._animatedValueY = Value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start();
      }
    });
  },
  componentWillUnmount : function() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  },
  getStyle: function() {
    return [
      Styles.square,
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            translateY: this.state.pan.y
          },
          {
            rotate: this.state.pan.x.interpolate({
              inputRange: [-200, 0, 200], 
              outputRange: ["-30deg", "0deg", "30deg"]
            })
          }
        ]
      },
      {
        opacity: this.state.pan.x.interpolate({
          inputRange: [-200, 0, 200], 
          outputRange: [0.5, 1, 0.5]
        })
      }
    ];
  },
  render: function() {
    return (
      <View style={Styles.container}>
        <Animated.View
          style={this.getStyle()}
          {...this._panResponder.panHandlers} 
        />
      </View>
    );
  }
});

var Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    borderRadius: SQUARE_DIMENSIONS/2,
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: '#FF8300'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AnimatedFlick);
