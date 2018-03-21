import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import update from 'immutability-helper';


export const rootUrl = 'http://localhost:3001/reminders.json';

class RemindersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: [],
      editingReminderId: null
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

    fetch(rootUrl,
      {
        method: 'POST',
        body: JSON.stringify(postReminder),
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(response => {
        console.log("New response", response);
        const reminders = update(this.state.reminders, {
          $splice: [[0,0, response]]
        });
        this.setState({
          reminders: reminders,
          editingReminderId: response.id
        })
      })
      .catch(error => console.log(error))
  };

  render() {
    const { reminders, editingReminderId} = this.state;
    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {reminders.map((reminder) => {
            if(editingReminderId === reminder.id) {
              return (<RemindersForm reminder={reminder} key={reminder.id} />)
            }
            return (<RemindersListItem reminder={reminder} key={reminder.id} />)
          })}
        </div>
      </div>
    )
  }
}

export default RemindersList;
