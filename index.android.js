import React, { Component } from 'react';
import {
  Text,
  AppRegistry,
  View
} from 'react-native';
import Router from './Router';



export default class HotelsApp extends Component {
  render() {
    return (
      <Router />
    );
  }
};


AppRegistry.registerComponent('HotelsApp', () => HotelsApp);
