import * as React from 'react';
import {Text,View, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import MyHeader from "../components/MyHeader";
import { ListItem } from 'react-native-elements';
import firebase from "firebase";
import db from "../config";

export default class Homescreen extends React.Component 
{
  constructor()
  {
    super();
    this.state={items:[]};
    this.requestRef=null;
  }
  
  getItemsList =()=>{
    this.requestRef = db.collection("items")
    .onSnapshot((snapshot)=>{
      var items = snapshot.docs.map(document => document.data());
      this.setState({
        items : items
      });
    })
  }

  componentDidMount(){
    this.getItemsList()
  }

  
  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
          <ListItem key={i} bottomDivider>
          <ListItem.Content>
              <ListItem.Title>{item.item}</ListItem.Title>
              <ListItem.Subtitle style={{width:200}}>{item.description}</ListItem.Subtitle>
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.props.navigation.navigate("UserDetails",{details: item})
              }}>
              <Text style={{color:'#ffff'}}>Exchange </Text>
              </TouchableOpacity>  
          </ListItem.Content>
          </ListItem>
      )
  }

  render()
  {
    return(
      <View style={{backgroundColor:"#ffc7c7",height:"100%"}}>
       <MyHeader title="Home" navigation={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.items.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={styles.text}>List of all Items are...</Text>
              </View>
            )
            :(
              <View style={{backgroundColor:"white"}}>
              <Text style={[styles.text,{marginBottom:10}]}> List of Items available </Text>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.items}
                renderItem={this.renderItem}
              />
              </View>
            )
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  subContainer:{

    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
 button:{
   width:70,
   height:35,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:10,
   backgroundColor:"#022e57",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 7,
   marginLeft:"75%",
   marginTop:-37
 },
 text:{
   fontWeight:'200',
   fontSize:20,
   fontFamily:"Itim",
   marginTop:5,
   alignSelf:"center",
 }
})