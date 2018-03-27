import React from 'react';
import { Link } from 'react-router-dom';

const RemindersListItem = (props) => {
  const deleteConfirmationPath = `/reminders/${props.reminder.id}/delete_confirmation`;
  const handleClick = () => { return props.onClick(props.reminder.id) };

  return (
    <div className="tile">
      <Link className="deleteLink" to={deleteConfirmationPath}>
        x
      </Link>

      <Link to={`/reminders/${props.reminder.id}`} className="tile-link">
        <h4 onClick={handleClick}>
          {props.reminder.title}
        </h4>
      </Link>
      <p onClick={handleClick}>
        {props.reminder.message}
      </p>
    </div>
  )
};

export default RemindersListItem;
