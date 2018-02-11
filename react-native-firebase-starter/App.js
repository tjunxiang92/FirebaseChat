import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.storage = firebase.storage();
    this.state = {
      todos: [],
      text: 'Nice',
      // firebase things?
    };
  }

  onPress() {
    this.ref.add({
      title: this.state.text,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    let todos = [];
    querySnapshot.forEach((doc) => {
      const { title, complete, createdAt } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
        createdAt
      });
    });

    todos = todos.sort((a, b) => a.createdAt - b.createdAt); 
    this.setState({todos});
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.todos.map(todo => {
            return (<Text>{todo.title}</Text>)
          })
        }

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          />
        <Button
          title="Press Me"
          onPress={this.onPress.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
