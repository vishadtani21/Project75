import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView}
from 'react-native';

import {Header} from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component {
 constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      storyText: '',
    };
  }

  submitStory = () => {

  
    db.collection("User Stories").add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
    });
    this.setState({
      title: '',
      author: '',
      storyText: '',
    });
    ToastAndroid.show("Story Submitted Successfully",ToastAndroid.SHORT)
    
  };

  render(){
    return ( 
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>

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
          
            <TextInput style = {styles.inputBox}
                      placeholder = "Story Title"
                      value={this.state.title}
          onChangeText={(text) => this.setState({ title: text })}
            />

            <TextInput style = {styles.inputBox}
                      placeholder = "Author"
                      value={this.state.author}
          onChangeText={(text) => this.setState({ author: text })}
            />

            <TextInput style = {styles.storyBox}
                      multiline = {true}
                      placeholder = "Story Title"
                      value={this.state.storyText}
          onChangeText={(text) => this.setState({ storyText: text })}
                      
            />

            <TouchableOpacity style = {styles.button}
            onPress={this.submitStory}>
             <Text style = {styles.buttonText}> Submit </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  inputBox:{
        fontSize:15,
        borderColor:'#1A1423',
        borderWidth:2,
        width:270,
        height:60,
        textAlign:'center',
        alignSelf:'center',
        marginTop:40
     
    },

    storyBox:{

        fontSize:15,
        borderColor:'#1E1E24',
        borderWidth:2,
        width:270,
        height:200,
        textAlign:'center',
        alignSelf:'center',
        marginTop:40,

    },

    button:{
      backgroundColor:'black',
      alignSelf:'center',
      marginTop:50,
      width:100,
      height:35,
      border:'black',
      borderRadius:10

    },

    buttonText:{
      color:'#DEFFF2',
      alignSelf: 'center',
      fontFamily: 'ariel',
      padding:5,
      fontStyle:'bold',
      fontSize:18
      
    }

   
})