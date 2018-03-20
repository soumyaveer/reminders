import React from 'react';

const RemindersListItem = ({reminder}) =>
  <div className="tile" key={reminder.id}>
    <h4>{reminder.title}</h4>
    <p>{reminder.message}</p>
  </div>;

export default RemindersListItem;
