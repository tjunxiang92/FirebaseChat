import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register';
import { connect } from './firebase';
var firebase = null;

class HomeScreen extends React.Component {
  constructor() {
    super();
    firebase = connect();

    // Initialize Cloud Firestore through Firebase
    this.ref = firebase.firestore().collection('todos');
    this.storage = firebase.storage();
    this.state = {
      todos: [],
      text: 'Nice',
      imgUrl: '',
      // firebase things?
    };

    this.handleChange = this.handleChange.bind(this);
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
    console.log(todos);
    this.setState({ todos });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    // Fetch URL
    this.storage.ref('photos/abc.jpg').getDownloadURL().then(url => {
      this.setState({imgUrl: url});
    })
  }

  onClick() {
    this.ref.add({
      title: this.state.text,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  handleChange(selectorFiles) {
    this.storage.ref('photos/abc.jpg').put(selectorFiles[0]).then(function (snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.todos.map(todo => {
            return (<div>{todo.title}</div>)
          })
        }
        
        
        <input type="text" onChange={(evt) => this.setState({text: evt.target.value})} value={this.state.text} />
        <button onClick={this.onClick.bind(this)}>Hola</button>

        <input type="file" onChange={(e) => this.handleChange(e.target.files)} />
        <br/>
        <img src={this.state.imgUrl} />
      </div>
    );
  }
}

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={HomeScreen} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default BasicExample;