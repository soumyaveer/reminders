import React from 'react';
import {Link} from 'react-router-dom';

const RemindersListItem = (props) => {
  const deleteConfirmationPath = `/reminders/${props.reminder.id}/delete_confirmation`;
  const handleClick = () => {
    return props.onClick(props.reminder.id)
  };

  return (
    <div className="tile">
      <Link className="deleteLink" to={deleteConfirmationPath}>
        x
      </Link>
      <h4>
        <Link to={`/reminders/${props.reminder.id}`} className="tile-link" onClick={handleClick}>
          {props.reminder.title}
        </Link>
      </h4>
      <p onClick={handleClick}>
        {props.reminder.message}
      </p>
    </div>
  )
};

export default RemindersListItem;
