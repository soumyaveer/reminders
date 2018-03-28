import React from 'react';
import '../App.css';
import RemindersList from './RemindersList'


const Home = () => (
  <div className="App">
    <div className="App-header">
      <h1>Don't Forget!</h1>
    </div>
    <RemindersList />
  </div>
);


export default Home;
