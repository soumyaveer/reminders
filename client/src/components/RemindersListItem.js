import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';

const RemindersListItem = (props) => {
  const deleteConfirmationPath = `/reminders/${props.reminder.id}/delete_confirmation`;

  const handleClick = () => {
    return props.onClick(props.reminder)
  };

  const handleIncrementClick = () => {
    return props.onLikeButtonClick(props.reminder)
  };

  return (
    <div className="tile">
      <Link className="delete-link" to={deleteConfirmationPath}>
        x
      </Link>

      <h4>
        <Link to={`/reminders/${props.reminder.id}`} className="tile-link">
          {props.reminder.title}
        </Link>
      </h4>

      <p onClick={handleClick}>
        {props.reminder.message}
      </p>

      <div>
        <Button className="like-button" onClick={handleIncrementClick}>
          &hearts; {props.reminder.likes}
        </Button>
      </div>
    </div>
  )
};



export default RemindersListItem;
