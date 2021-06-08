import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {DrawerNavigation} from "../components/DrawerNavigation";
import UserDetails from "../screens/UserDetails";
import Homescreen from "../screens/Homescreen"

export const stackNavigator=createStackNavigator({
  Home:
  {
    screen: Homescreen,
    navigationOptions:{
      headerShown : false
    }
  },
  UserDetails:
  {
    screen: UserDetails,
    navigationOptions:{
      headerShown : false
    }
  }
  },
  {
    initialRouteName: "Home"
  }
)