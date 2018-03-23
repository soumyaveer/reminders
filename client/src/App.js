import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RemindersListItem from "./components/RemindersListItem";
import RemindersList from "./components/RemindersList";
import RemindersForm from "./components/RemindersForm";
import Home from './components/Home';
import Reminders from './components/Reminders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/" component={Reminders} />
          <Route path="/reminders/new" render={ (props) =>
            <RemindersForm />} />
          <Route path="/reminders/edit" component={RemindersForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
