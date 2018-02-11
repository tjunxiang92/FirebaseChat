import React, { Component } from 'react';
import { connect } from './firebase';
var firebase = null;

export default class Register extends Component {
  constructor() {
    super();
    firebase = connect();

    this.state = {
      email: '',
      password: '',
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({user});
    });
  }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
        var user = firebase.auth().currentUser;
        console.log(user); // Optional
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
          var user = firebase.auth().currentUser;
          console.log(user); // Optional
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
      )
    } else {
      return (
        <div className="App">
          <div>
            <h2>Register</h2>
            <input type="text" onChange={(evt) => this.setState({email: evt.target.value})} value={this.state.text} placeholder="Email"/>
            <input type="password" onChange={(evt) => this.setState({password: evt.target.value})} placeholder="Password"/>
            <button onClick={this.register.bind(this)}>Register</button>
            <button onClick={this.login.bind(this)}>Login</button>
          </div>
        </div>
      )
    }
  }
}