import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';

class RemindersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:3001/reminders.json';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          reminders: response
        })
      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <Button className="new-button">
          Add Reminder
        </Button>

        {this.state.reminders.map((reminder) => {
          return (<RemindersListItem reminder={reminder} key={reminder.id} />)
        })}

      </div>
    )
  }
}

export default RemindersList;
