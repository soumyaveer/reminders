import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RemindersList from './components/RemindersList'
import ReactDOM from 'react-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Don't Forget!</h1>
        </div>
        <RemindersList />
      </div>
    );
  }
}

export default App;
