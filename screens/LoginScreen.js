import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/user-not-found':
        alert('To many requests.Try again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/invalid-email':
        alert('Please enter the correct email and password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

      <Header
                   backgroundColor={'#F4ACB7'}
                    centerComponent={{
                      text: 'Bed Time Stories',
                      style: { 
                        color: 'black',
                        fontSize: 25,   
                        fontFamily:'ariel'                
             },
          }}
          
          />

          
      <Image
        source = {require('../assets/image.jpg')}
        style = {styles.image}
      />

        <View style={styles.container1}>
         
          <TextInput
              placeholder="Enter the e-mail"
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="Enter the password"
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
              secureTextEntry = {true}
              />
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#DEFFF2'
  },

  container1:{
    justifyContent:'center',
    alignItems:'center',
   
  },
  container2:{
    alignItems:'center',
    margin: 10 
  },
  textInput : {
    width:200,
    height: 50,
    borderWidth:2,
    borderColor:'black',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom:10,
    borderRadius:10,
    margin: 10,
    backgroundColor: 'white',
   
  },
  button:{
    width:100,
    height:30,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
    borderRadius: 5,
   
  },
  buttonText:{
    color:'white',
    fontSize:18,
  },
  image:{
    width:280,
    height:180,
    margin:20,
    borderRadius:3
  },
})