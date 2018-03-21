import React from 'react';

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
    console.log(name);
    console.log(value);
    this.setState({
      [name] : value
    })
  };

  render(){
    const { title, message, time, recipients } = this.state;
    return (
      <div className="tile">
        <form>
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
