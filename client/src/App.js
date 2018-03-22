import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RemindersListItem from "./components/RemindersListItem";
// import RemindersList from "./components/RemindersList";
import RemindersForm from "./components/RemindersForm";
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/reminders/:id" component={RemindersListItem} />
          <Route path="/reminders/new" component={RemindersForm} />
          <Route path="/reminders/edit" component={RemindersForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
