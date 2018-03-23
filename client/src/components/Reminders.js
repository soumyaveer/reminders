import React from 'react';
import {Switch, Route} from 'react-router';
import RemindersList from "./RemindersList";
import ReminderDetails from "./ReminderDetails";

const Reminders = () => (
  <div>
    <Switch>
      <Route exact path='/reminders' component={RemindersList} />
      <Route path='/reminders/:id' component={ReminderDetails} />
    </Switch>
  </div>
);

export default Reminders;
