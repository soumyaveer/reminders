import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RemindersForm from "./components/RemindersForm";
import Home from './components/Home';
import ReminderDetails from "./components/ReminderDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/reminders/:id' component={ReminderDetails} />

          <Route path="/reminders/new" render={ (props) =>
            <RemindersForm />} />
          <Route path="/reminders/edit" component={RemindersForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
