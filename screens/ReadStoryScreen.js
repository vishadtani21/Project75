import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }

  componentDidMount() {
    this.retrieveStories();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = () => {
    try {
      var allStories = [];
      var stories = db
        .collection('User Stories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allStories.push(doc.data());
            console.log('User Stories', allStories);
          });
          this.setState({ allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };

   SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }


  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>

      <View>
        <View >
          <SearchBar style = {styles.searchBar}
            placeholder="Write title of your story here."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>

        <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.data}
                renderItem={({ item }) => (
                  <View 
                  style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      padding: 10,
                      alignItems: 'center',
                      margin: 10,
                      backgroundColor:'#F4ACB7',
                      borderRadius:5}}>
                    <Text>  Title: {item.title}</Text>
                    <Text>  Author : {item.author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                />

      </View>
    </KeyboardAvoidingView>
        
     
    );
  }
}
const styles = StyleSheet.create({
searchBar:{
  fontFamily:'britannic',
  color:'white',
  padding:10,
},
});
