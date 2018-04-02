import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import {addReminder, editReminder, fetchReminders} from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RemindersList extends React.Component {
  addNewReminder = () => {
    const reminderAttributes = {
      message: '',
      recipient_email_address_values: '',
      time: '',
      title: ''
    };

    this.props.dispatch(addReminder(reminderAttributes));
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchReminders());
  }

  enableEditing = (reminder) => {
    this.props.dispatch(editReminder(reminder));
  };

  render() {
    const {reminders, reminderInEditMode} = this.props;

    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {reminders.map((reminder) => {
            if (reminderInEditMode === reminder) {
              return (
                <RemindersForm
                  reminder={reminder}
                  key={reminder.id}
                />
              )
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
  };
}

RemindersList.propTypes = {
  reminderInEditMode: PropTypes.object,
  reminders: PropTypes.array.isRequired
};

function mapStateToProps(storeState) {
  return {
    reminderInEditMode: storeState.reminderInEditMode,
    reminders: storeState.reminders
  };
}

export default connect(mapStateToProps)(RemindersList);
