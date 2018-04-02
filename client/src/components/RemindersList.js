import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import update from 'immutability-helper';
import {addReminder, fetchReminders} from '../actions';
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

  enableEditing = (id) => {
    this.setState({
      editingReminderId: id
    }, () => { this.title.focus() })
  };

  render() {
    const { dispatch, reminders, editingReminderId} = this.props;

    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {reminders.map((reminder) => {
            if(editingReminderId === reminder.id) {
              return (<RemindersForm
                reminder={reminder}
                key={reminder.id}
                updateReminder={this.updateReminder}
                titleRef={input => this.title = input }
              />)
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
  }

  updateReminder = (reminder) => {
    const reminderIndex = this.state.reminders.findIndex(x => x.id === reminder.id);

    const reminders = update(this.state.reminders, {
      [reminderIndex] : {$set: reminder}
    });

    this.setState({
      reminders
    })
  };
}

RemindersList.propTypes = {
  editingReminderId: PropTypes.number,
  reminders: PropTypes.array.isRequired
};

// map the store's state to the component's props
function mapStateToProps(state) {
  return {
    editingReminderId: state.editingReminderId || null,
    reminders: state.reminders || []
  };
}

export default connect(mapStateToProps)(RemindersList);
