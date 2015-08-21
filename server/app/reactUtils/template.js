'use strict';

var React = require('react-native');
var BasicSwitch = require('./components/SwitchIOS');
var BasicScrollView = require('./components/ScrollView');
var BasicSlider = require('./components/SliderIOS');
var Navbar = require('./components/TabBarIOS');

var {
  TabBarIOS,
  Image,
  SliderIOS,
  ScrollView,
  SwitchIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// data = rep

var reactNative = React.createClass({
    render: function() {
        return (
            {{#each }}
            {{/each }}
        );
    }
})


var styles = StyleSheet.create({
    {{{styleObject}}}
})

AppRegistry.registerComponent('reactNative', () => reactNative);

