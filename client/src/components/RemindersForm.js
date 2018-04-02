import React from 'react';
import {updateReminder} from "../actions";
import {connect} from "react-redux";

class RemindersForm extends React.Component {
  constructor(props) {
    super(props);

    const {
      message,
      id,
      recipient_email_address_values,
      time,
      title
    } = props.reminder;

    // this represents the reminder being edited
    this.state = {
      message,
      id,
      recipient_email_address_values,
      time,
      title
    };

    // Question: is this ok?
    // this.state = {
    //   unsavedReminderAttributes: this.props.reminder
    // };
  };

  handleOnChange = (event) => {
    const reminderAttributeName = event.target.name;
    const reminderAttributeValue = event.target.value;

    this.setState({
      [reminderAttributeName]: reminderAttributeValue
    });
  };

  render() {
    const {title, message, id, time, recipient_email_address_values} = this.state;

    return (
      <div className="tile">
        <form onBlur={() => this.props.handleOnBlur({title, id, message, time, recipient_email_address_values})}>
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
  };
};

const mapStateToProps = () => {
  return {};
};

// https://learn.co/tracks/full-stack-web-development-v3/redux/redux-library/map-dispatch-to-props-readme
const mapDispatchToProps = (dispatch) => {
  return {
    handleOnBlur: (reminderAttributes) => {
      dispatch(updateReminder(reminderAttributes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemindersForm);
