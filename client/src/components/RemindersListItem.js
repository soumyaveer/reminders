import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class RemindersListItem extends React.Component {

  handleOnClick = () => {
    this.props.onClick(this.props.reminder.id)
  };

  render() {
    const deleteConfirmationUrl = `/reminders/${this.props.reminder.id}/delete_confirmation`;
    return (
      <div className="tile">
        <Link className="deleteLink" to={deleteConfirmationUrl} >
            x
        </Link>

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
