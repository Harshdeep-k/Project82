import * as React from 'react';
import {Text,View, TouchableOpacity,TextInput,KeyboardAvoidingView,StyleSheet,FlatList} from 'react-native';
import MyHeader from "../components/MyHeader";
import {ListItem} from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class MyBarters extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state={
      userId: firebase.auth().currentUser.email,
      userName:"",
      allBarters:[]
    }
  }
  keyExtractor = (item, index) => index.toString();


  getAllBarters=()=>
  {
    db.collection("all_barters").where("user_id","==",this.state.userId).onSnapshot((snapshot)=>
    {
      var allBarters=[];
      snapshot.docs.map((doc)=>
      {
        var barter=doc.data();
        barter["doc_id"]=doc.id;
        allBarters.push(barter);  
      })
      this.setState(
        {
          allBarters:allBarters
        }
      )
    })
  }

  renderItem = ( {item, i} ) =>{
  console.log({item});
    return (
          <ListItem key={i} bottomDivider>
          <ListItem.Content>
              <ListItem.Title>{item.item}</ListItem.Title>
              <ListItem.Subtitle style={{width:200}}>{item.request_status}</ListItem.Subtitle>
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.props.navigation.navigate("UserDetails",{details: item})
              }}>
              <Text style={{color:'#ffff',alignSelf:"center"}}>Exchange </Text>
              </TouchableOpacity>  
          </ListItem.Content>
          </ListItem>
      )
  }

  componentDidMount()
  {
    this.getAllBarters();
  }
  
  render()
  {
    return(
        <View style={{backgroundColor:"#ffc7c7",height:"100%"}}>
      <View>
      <MyHeader title="My Barters" navigation={this.props.navigation}/>   
        <View style={{ flex: 1 }}>
          {this.state.allBarters.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all barters is...</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
button:{
   width:200,
   height:35,
   justifyContent:'center',
   alignSelf:'center',
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
   marginTop:30,
 },
 text:{
   fontWeight:'200',
   fontSize:20,
   fontFamily:"Itim",
   marginTop:5,
   alignSelf:"center",
 }
  }
)