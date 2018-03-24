import React from 'react';

const rootUrl = 'http://localhost:3001/reminders';

class RemindersForm extends React.Component {
  constructor(props) {
    super(props);
    const { title, message, time } = this.props.reminder;
    const recipient_email_addresses = this.props.reminder;

    this.state = {
      title,
      message,
      time,
      recipient_email_addresses: recipient_email_addresses
    }
  }

  handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'recipients_email_addresses') {
      const values = value[0].split(", ")
      this.setState({
        name: values
      })
    } else {
      this.setState({
        [name] : value
      })
    }

  };

  handleOnBlur = () => {
    const putData = {
      title: this.state.title,
      message: this.state.message,
      time: this.state.time,
      recipient_email_addresses: [this.state.recipient_email_addresses]
    };

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
      .then(response => {
        console.log(response);
        this.props.updateReminder(response)
      })
      .catch(error => console.log(error))
  };

  render(){
    const { title, message, time, recipient_email_addresses } = this.state;
    console.log("Form");
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
            name="recipient_email_addresses"
            className="input"
            placeholder="Enter Recipient Address (each address should be comma seperated)"
            value={recipient_email_addresses}
            onChange={this.handleOnChange}
          >
          </textarea>

        </form>
      </div>
    )
  }

}

export default RemindersForm;
