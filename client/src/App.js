import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RemindersForm from "./components/RemindersForm";
import Home from './components/Home';
import ReminderDetails from "./components/ReminderDetails";
import DeleteConfirmation from './components/DeleteConfirmation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/reminders/:id' component={ReminderDetails} />
          <Route path="/reminders/:id/delete_confirmation" component={DeleteConfirmation} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
