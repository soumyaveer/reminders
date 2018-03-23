import React from 'react';
import {Switch, Route} from 'react-router';
import RemindersList from "./RemindersList";
import RemindersListItem from "./RemindersListItem";

const Reminders = () => (
  <div>
    <Switch>
      <Route exact path='/reminders' component={RemindersList} />
      <Route path='/reminders/:id' component={RemindersListItem} />
    </Switch>
  </div>
);

export default Reminders;
