import * as React from 'react';
import {Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import LoginScreen from "./screens/LoginScreen";
import {DrawerNavigation} from "./components/DrawerNavigation";
import UserDetails from "./screens/UserDetails";

export default class App extends React.Component{
  render(){
  return(
    <AppContainer/>
  )
 }
}

const AppNavigator=createSwitchNavigator({ 
    
   Drawer:{screen: DrawerNavigation},
   UserDetails:{screen:UserDetails},
    Login:{screen: LoginScreen},
 
  
   }
)
const AppContainer=createAppContainer(AppNavigator)