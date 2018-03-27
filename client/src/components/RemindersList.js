import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import update from 'immutability-helper';

const rootUrl = '/api/reminders';

class RemindersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: [],
      editingReminderId: null
    }

  }

  componentDidMount() {
    const getUrl = `${rootUrl}.json`;
    fetch(getUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({
          reminders: response
        })
      })
      .catch(error => console.log(error))
  }

  addNewReminder = () => {
    let postReminder = {
        title: '',
        message: '',
        time: '',
        recipient_email_address_values: ''
    };

    const postUrl = `${rootUrl}.json`;

    fetch(postUrl,
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

  updateReminder = (reminder) => {
    const reminderIndex = this.state.reminders.findIndex(x => x.id === reminder.id);

    const reminders = update(this.state.reminders, {
      [reminderIndex] : {$set: reminder}
    });

    this.setState({
      reminders
    })
  };

  enableEditing = (id) => {
    this.setState({
      editingReminderId: id
    }, () => { this.title.focus() })
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
              return (<RemindersForm
                reminder={reminder}
                key={reminder.id}
                updateReminder={this.updateReminder}
                titleRef={input => this.title = input }
              />)
            }
            return (
              <RemindersListItem
                reminder={reminder}
                key={reminder.id}
                onClick={this.enableEditing}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default RemindersList;
