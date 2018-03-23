import React from 'react';
import Link from 'react-router'
import RemindersList from './RemindersList';
import {withRouter} from 'react-router';

class RemindersListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminder: {
        title: '',
        message: '',
        time: '',
        recipient_email_addresses: []
      }
    }

  }

  handleOnClick = () => {
    this.props.onClick(this.props.reminder.id)
  };

  handleDelete = () => {
    this.props.onDelete(this.props.reminder.id)
  };

  findReminder = (matchParamsId) => {
    const reminderUrl = `http://localhost:3001/reminders/${matchParamsId}.json`;

    fetch(reminderUrl)
      .then(response => response.json())
      .then(reminder => {
        this.setState({
          reminder
        })
      })
  };

  componentDidMount() {
    if (!!this.props.match) {
      this.findReminder(parseInt(this.props.match.params.id));
    }
  }

  render() {
     if (!this.props.match) {
        return (
          <div className="tile">
            <span className="deleteButton" onClick={this.handleDelete}>
              x
            </span>

            <h4 onClick={this.handleOnClick}>
              {this.props.reminder.title}
            </h4>

            <p onClick={this.handleOnClick}>
              {this.props.reminder.message}
            </p>
          </div>
        )
      } else if (!!this.props.match) {
        return (
          <div className="tile-large">
            <label>Title:</label>
            <h4>
              {this.state.reminder.title}
            </h4>

            <label>Message:</label>
            <p>
              {this.state.reminder.message}
            </p>

            <label>Time:</label>
            <p>
              {this.state.reminder.time}
            </p>

            <label>Recipients</label>
            <ul>
              {this.state.reminder.recipient_email_addresses.map((recipient, index) => {
                return (
                <li key={index}>{recipient}</li>
                )
              })}
            </ul>

          </div>
        )
      }
      else {
        return <div>No such Reminder</div>
      }
    }
  }

export default RemindersListItem;
