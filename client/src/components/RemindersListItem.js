import React from 'react';
import Time from 'react-time-format';

const RemindersListItem = ({reminder}) =>
  <div className="tile" key={reminder.id}>
    <h4 className="tile-header">{reminder.title}</h4>
    <p className="tile-body">{reminder.message}</p>
  </div>;

export default RemindersListItem;
