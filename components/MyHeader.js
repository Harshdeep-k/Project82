import * as React from 'react';
import {Text,View} from 'react-native';
import {Header,Icon} from 'react-native-elements';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default class MyHeader extends React.Component{
  constructor(props)
  {
    super(props);
  }
  
  render()
  {
    return(
      <View>
      <SafeAreaProvider>
      <Header backgroundColor="#022e57"
      leftComponent={<Icon name='list' type='font-awesome' color='gray'  onPress={() => this.props.navigation.toggleDrawer()}/>}
      centerComponent={{text: this.props.title, style:{
        fontWeight:"bold", fontSize:23, color:"#ffffff", fontFamily:"Itim"
      }}}/>
      </SafeAreaProvider>
      </View>
    )
  }
}