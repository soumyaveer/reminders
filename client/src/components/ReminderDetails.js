import React from 'react';
import {Link} from 'react-router-dom';
import {fetchReminder} from "../actions";

import Time from 'react-time';
import {connect} from "react-redux";

class ReminderDetails extends React.Component {
  componentDidMount() {
    const reminderId = this.props.match.params.id;
    this.props.handleFetchReminder(reminderId);
  }

  render() {
    const reminder = this.props.reminder;

    if (reminder) {
      return (
        <div className="tile-large">
          <h2>
            {this.props.reminder.title}
          </h2>
          <h4>Message:</h4>
          <p>
            {this.props.reminder.message}
          </p>
          <h4>Time:</h4>
          <p>
            <Time value={this.props.reminder.time} utc={true} format="YYYY/MM/DD HH:mm"/>
          </p>

          <h4>Recipients</h4>
          <p>
            {this.props.reminder.recipient_email_address_values}
          </p>

          <Link className="back-link" to="/">Back</Link>
        </div>
      )
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}

const mapStateToProps = (storeState) => {
  return {reminder: storeState.reminderInDetailMode};
};

// https://learn.co/tracks/full-stack-web-development-v3/redux/redux-library/map-dispatch-to-props-readme
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchReminder: (reminderId) => {
      return dispatch(fetchReminder(reminderId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetails);
