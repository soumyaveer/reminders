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

          <div className="reminder-details">
            <label className="reminder-label">Message:</label>
            <p className="reminder-details-info">
              {this.props.reminder.message}
            </p>
          </div>

          <div className="reminder-details">
            <label className="reminder-label">Time:</label>
            <p className="reminder-details-info">
              {<Time value={this.props.reminder.time} format="YYYY/MM/DD HH:mm"/> || ''}
            </p>
          </div>

          <div className="reminder-details">
            <label className="reminder-label">Recipients</label>
            <p className="reminder-details-info">
              {this.props.reminder.recipient_email_address_values}
            </p>
          </div>

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
