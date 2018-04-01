import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from './configureStore';
import Home from './components/Home';
import ReminderDetails from "./components/ReminderDetails";
import DeleteConfirmation from './components/DeleteConfirmation';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path='/reminders/:id' component={ReminderDetails}/>
            <Route path="/reminders/:id/delete_confirmation" component={DeleteConfirmation}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
