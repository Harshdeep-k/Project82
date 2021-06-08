import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import {SafeAreaProvider} from "react-native-safe-area-context";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config.js";

export default class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      item: this.props.navigation.getParam("details")["item"],
      description: this.props.navigation.getParam("details")["description"],
      exchangerId:this.props.navigation.getParam("details")["user_id"],
      exchangerName: "",
      exchangerContact: "",
      exchangerAddress: "",
      exchangerRequestDocId: "",
      exchangeId:this.props.navigation.getParam("details")["exchange_id"],

    };
  }


  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  getExchangerDetails=()=> {
     db.collection("users")
     .where("email_id", "==",this.state.exchangerId)
     .get()
     .then((snapshot) => {
          snapshot.forEach((doc) => {
            var user=doc.data();
            console.log(user);
            this.setState({
              exchangerName: user.first_name,
              exchangerContact: user.contact,
              exchangerAddress: user.address,
            });
          });
        });

      db.collection("items")
        .where("exchange_id", "==", this.state.exchangeId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.setState({
              exchangeRequestDocId: doc.id,
            });
          });
        });
    }

    updateExchangeStatus()
    {
      db.collection("all_barters").add({
            item: this.state.item,
            exchange_id: this.state.exchangeId,
            exchanger: this.state.exchangerName,
            user_id: this.state.userId,
            request_status: "Interested",
          });
    }


  componentDidMount() {
    this.getUserDetails(this.state.userId);
    this.getExchangerDetails();
  }

  render() {
    return (
       <View style={{backgroundColor:"#ffc7c7",height:"100%"}}>
      <View style={{flex:0.8 }}>
        <SafeAreaProvider>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
             centerComponent={{text: "Details" , style:{
            fontWeight:"bold", fontSize:23, color:"#ffffff", fontFamily:"Itim"
          }}}
            backgroundColor="#022e57"
          />
          </SafeAreaProvider>
          <View>
          <Text style={styles.text}> Item Description</Text>
          <Card>
          <Text style={styles.text}> Item: {this.state.item}{"\n"} 
                                      Description: {this.state.description}{"\n"}
                                           </Text>
          </Card>
         
          <Text style={styles.text}> Exchanger Information</Text>
          <Card>
           <Text style={styles.text}>
                                      ExchangerName:{this.state.exchangerId}{"\n"}
                                      ExchangerContact:{this.state.exchangerContact}{"\n"}
                                      ExchangerAddress:{this.state.exchangerAddress}{"\n"}
          </Text>
          </Card>
       
          <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateExchangeStatus();
                    this.props.navigation.navigate("MyBarters");
                  }}
                >
                  <Text  style={{color:'#ffff',alignSelf:"center"}}>I want to Exchange</Text>
                </TouchableOpacity>
                </View>
 </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
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
});
