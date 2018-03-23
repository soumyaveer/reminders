import React from 'react';
import {withRouter} from 'react-router';
import Time from 'react-time';

class ReminderDetails extends React.Component {
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
    return (

      <div className="tile-large">
        <h2>
          {this.state.reminder.title}
        </h2>

        <h4>Message:</h4>
        <p>
          {this.state.reminder.message}
        </p>

        <h4>Time:</h4>
        <p>
          <Time value={this.state.reminder.time} locale="PDT" format="YYYY/MM/DD HH:mm:ss" />
        </p>

        <h4>Recipients</h4>
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
}

export default ReminderDetails;
