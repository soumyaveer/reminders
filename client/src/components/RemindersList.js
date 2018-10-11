import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import {addReminder, fetchReminders, updateReminder} from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RemindersList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editableReminderId: null
    }
  }

  addNewReminder = () => {
    const reminderAttributes = {
      likes: 0,
      message: '',
      recipient_email_address_values: '',
      time: '',
      title: ''
    };


    this.props.dispatch(addReminder(reminderAttributes)).then((json) => {
      this.setState({
        editableReminderId: json.reminderAttributes.id
      });
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchReminders());
  }

  enableEditing = (reminder) => {
    this.setState({
      editableReminderId: reminder.id
    })
  };

  handleLikeButtonClick = (reminder) => {
    const updatingReminder = Object.assign({}, reminder, {
      likes: reminder.likes + 1
    });
    this.props.dispatch(updateReminder(updatingReminder))
  };

  compareLikes = (reminderA, reminderB) => {
    return reminderB.likes - reminderA.likes
  };


  render() {
    let {reminders} = this.props;
    reminders.sort(this.compareLikes);

    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {reminders.map((reminder) => {
            if (this.state.editableReminderId === reminder.id) {
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
                onLikeButtonClick={this.handleLikeButtonClick}
              />
            )
          })}
        </div>
      </div>
    )
  };
}

RemindersList.propTypes = {
  editableReminderId: PropTypes.number,
  reminders: PropTypes.array.isRequired
};

function mapStateToProps(storeState) {
  return {
    reminders: storeState.reminders
  };
}

export default connect(mapStateToProps)(RemindersList);
