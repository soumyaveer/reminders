import React from 'react';
import { Link } from 'react-router-dom'

class RemindersListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    this.props.onClick(this.props.reminder.id)
  };

  handleDelete = () => {
    this.props.onDelete(this.props.reminder.id)
  };

  render() {
    return (
      <div >
        <Link to={`/reminders/${this.props.reminder.id}`} className="tile">
          <span className="deleteButton" onClick={this.handleDelete}>
            x
          </span>

          <h4 onClick={this.handleOnClick}>
            {this.props.reminder.title}
          </h4>

          <p onClick={this.handleOnClick}>
            {this.props.reminder.message}
          </p>
        </Link>
      </div>
        )
      }
  }

export default RemindersListItem;
