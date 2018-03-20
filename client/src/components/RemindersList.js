import React from 'react';

class RemindersList extends React.Component {
  constructor(props) {
    super(props)

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
          reminders: response.data
        })
      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        Reminders
      </div>
    )
  }
}

export default RemindersList;
