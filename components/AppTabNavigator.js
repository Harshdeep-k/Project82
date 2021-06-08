import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Homescreen from "../screens/Homescreen";
import Exchange from "../screens/Exchange";
import {stackNavigator} from "./StackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  Home : {
    screen: stackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/1.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Home",
    }
  },
  Exchange: {
    screen: Exchange,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/2.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Exchange",
     
    }
  }
});
