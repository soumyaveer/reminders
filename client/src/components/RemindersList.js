import React from 'react';
import RemindersListItem from "./RemindersListItem";
import Button from './Button';
import RemindersForm from './RemindersForm';
import {addReminder, fetchReminders, updateReminder} from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RemindersList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      reminder: {
        title: '',
        message: '',
        time: '',
        likes: 0,
        recipient_email_address_values: ''
      },
      reminderInEditMode: null
    }
  }

  addNewReminder = () => {
    const reminderAttributes = {
      message: '',
      recipient_email_address_values: '',
      time: '',
      title: '',
      likes: ''
    };

    this.props.dispatch(addReminder(reminderAttributes));
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchReminders());
  }

  componentDidUpdate(prevProps, prevState) {
    const {reminders} = this.props;

    prevProps.reminders.map((prevReminder, index) => {
      if (prevReminder.likes !== reminders[index].likes) {
        let reminder = reminders[index];

        this.setState({
          reminder
        }, function(){
          this.props.dispatch(updateReminder(this.state.reminder))
        })

      }
    })
  }

  enableEditing = (reminder) => {
    this.setState({
      reminderInEditMode: reminder
    })
  };

  render() {
    const {reminders} = this.props;

    return (
      <div>
        <div>
          <Button className="new-button" onClick={this.addNewReminder}>
            Add Reminder
          </Button>
        </div>

        <div className="reminders">
          {reminders.map((reminder, index) => {
            if (this.state.reminderInEditMode === reminder) {
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
                index={index}
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
    reminders: storeState.reminders
  };
}

export default connect(mapStateToProps)(RemindersList);
