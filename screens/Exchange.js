import * as React from 'react';
import {Text,View, TouchableOpacity,TextInput,KeyboardAvoidingView,StyleSheet} from 'react-native';
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";

export default class Exchange extends React.Component 
{
  constructor()
  {
    super();
    this.state={
      userId : firebase.auth().currentUser.email,
      item:"",
      description:"",
      exchangeId:"",
    }
  }
  createUniqueId(){
    return Math.random().toString(36).substring(5);
  }

  addItem =(item,description)=>{
    var userId = this.state.userId;
    var exchangeId = this.createUniqueId()
    db.collection("items").add({
        "user_id": userId,
        "item":item,
        "description":description,
        "exchange_id"  : exchangeId,
    })

    this.setState({
        item :'',
        description : '',
        exchangeId: '',
    })

    return alert("Added Item succesfully")
  }

  render()
  {
    return(
      <View style={{backgroundColor:"#ffc7c7",height:"100%"}}>
       <MyHeader title="Exchange screen"  navigation={this.props.navigation}/>
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Item name"}
                onChangeText={(text)=>{
                    this.setState({
                        item:text
                    })
                }}
                value={this.state.item}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Description"}
                onChangeText ={(text)=>{
                    this.setState({
                        description:text
                    })
                }}
                value ={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addItem(this.state.item,this.state.description)}}
                >
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
       </View>
    )
  }
}

const styles=StyleSheet.create(
  {
    button:{
      marginLeft:"21%",
      marginTop: 20,
      width:200,
      height:40,
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
      marginBottom:100,
    },
    formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#022e57',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
   buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20,
   fontFamily:"Itim",
 }
})