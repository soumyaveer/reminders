import React from 'react';
import { Link } from 'react-router-dom'

class RemindersListItem extends React.Component {

  handleOnClick = () => {
    this.props.onClick(this.props.reminder.id)
  };

  handleDelete = () => {
    this.props.onDelete(this.props.reminder.id)
  };

  render() {
    return (
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>
            x
        </span>

        <Link to={`/reminders/${this.props.reminder.id}`} className="tile-link">
          <h4 onClick={this.handleOnClick}>
            {this.props.reminder.title}
          </h4>
        </Link>

          <p onClick={this.handleOnClick}>
            {this.props.reminder.message}
          </p>
      </div>
        )
      }
  }

export default RemindersListItem;
