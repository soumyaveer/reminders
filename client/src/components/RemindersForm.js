import React from 'react';

const rootUrl = 'http://localhost:3001/reminders';

class RemindersForm extends React.Component {
  constructor(props) {
    super(props);
    const { title, message, time, recipients } = this.props.reminder;
    this.state ={
      title: title,
      message: message,
      time: time,
      recipient_email_addresses: recipients
    }
  }

  handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name] : value
    })
  };

  handleOnBlur = () => {
    const putData = {
      title: this.state.title,
      message: this.state.body,
      time: this.state.time,
      recipient_email_addresses: this.state.recipient_email_addresses
    }

    const editUrl = `${rootUrl}/${this.props.reminder.id}`;
    console.log(editUrl)
    fetch(editUrl, {
      method: 'PUT',
      body: JSON.stringify(putData),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
    })
    .then(response => response.json())
      .then(response => {console.log(response)})
  };

  render(){
    const { title, message, time, recipients } = this.state;
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
            value={time}
            onClick={this.handleOnChange}
          />

          <textarea
            name="recipients"
            className="input"
            placeholder="Enter Recipient Address (each address should be comma seperated)"
            value={recipients}
            onChange={this.handleOnChange}
          >
          </textarea>

        </form>
      </div>
    )
  }

}

export default RemindersForm;
