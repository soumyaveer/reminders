import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
const rootUrl = 'http://localhost:3001/reminders.json';

class RemindersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: []
    }
  }

  componentDidMount() {
    fetch(rootUrl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          reminders: response
        })
      })
      .catch(error => console.log(error))
  }

  addNewReminder = () => {
    let postReminder = {
      reminder: {
        title: '',
        message: '',
        time: '',
        recipient_email_addresses: []
      }
    };

    console.log(JSON.stringify(postReminder));
    fetch(rootUrl,
      {
        method: 'POST',
        body: JSON.stringify(postReminder),
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        },
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  };

  render() {
    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {this.state.reminders.map((reminder) => {
            return (<RemindersListItem reminder={reminder} key={reminder.id} />)
          })}
        </div>
      </div>
    )
  }
}

export default RemindersList;
