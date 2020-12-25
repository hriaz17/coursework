import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  import Home from '../home'
  import Dashboard from '../dashboard'
  const AppNavigator = createStackNavigator({
    home:Home,
    dashboard:Dashboard
  });
  export default createAppContainer(AppNavigator);

Dashboard/index.js
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Dashboard extends Component {
    render() {
        return (
            <View>
                <Text> Dashboard </Text>
            </View>
        )
    }
}