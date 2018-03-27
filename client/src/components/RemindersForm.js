import React from 'react';

const rootUrl = 'http://localhost:3001/reminders';

class RemindersForm extends React.Component {
  constructor(props) {
    super(props);
    const { title, message, time, recipient_email_address_values } = this.props.reminder;

    this.state = {
      title,
      message,
      time,
      recipient_email_address_values
    }
  }

  handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleOnBlur = () => {
    const {title, message, time, recipient_email_address_values} = this.state;

    const requestParams = {
      reminder: {
        title,
        message,
        time,
        recipient_email_address_values
      }
    };

    const patchURL = `${rootUrl}/${this.props.reminder.id}.json`;

    fetch(patchURL, {
      method: 'PUT',
      body: JSON.stringify(requestParams),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
    })
      .then(response => {
        const reminderJSON = JSON.parse(response);
        this.props.updateReminder(reminderJSON);
      })
      .catch(error => console.log(error))
  };

  render(){
    const { title, message, time, recipient_email_address_values } = this.state;
    return (
      <div className="tile">
        <form onBlur={this.handleOnBlur}>
          <input
            type="text"
            className="input"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={this.handleOnChange}
            ref={this.props.titleRef}
          />

          <textarea
            name="message"
            className="input"
            placeholder="Enter Message"
            value={message}
            onChange={this.handleOnChange}
          >
          </textarea>

          <input
            name="time"
            className="datetime"
            type="datetime-local"
            value={time || ''}
            onChange={this.handleOnChange}
          />

          <textarea
            name="recipient_email_address_values"
            className="input"
            placeholder="Enter Recipient Address (each address should be comma separated)"
            value={recipient_email_address_values}
            onChange={this.handleOnChange}
          >
          </textarea>

        </form>
      </div>
    )
  }

}

export default RemindersForm;
