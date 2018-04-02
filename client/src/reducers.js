import {FETCH_REMINDERS, DELETE_REMINDER, ADD_REMINDER, UPDATE_REMINDER, EDIT_REMINDER} from "./actions";

export default function rootReducer(state, action) {
  if (!state) {
    state = {
      reminderInEditMode: null,
      reminders: []
    }
  }

  switch (action.type) {
    case ADD_REMINDER:
      return Object.assign(
        {},
        state,
        {
          reminders: state.reminders.concat(action.reminderAttributes),
          reminderInEditMode: action.reminderAttributes
        }
      );

    case DELETE_REMINDER:
      return Object.assign(
        {},
        state,
        {
          reminders: state.reminders.filter(reminder => reminder.id !== action.reminderId)
        }
      );

    case EDIT_REMINDER:
      return Object.assign({}, state, { reminderInEditMode: action.reminderInEditMode });

    case FETCH_REMINDERS:
      return Object.assign({}, state, {
        reminderInEditMode: null,
        reminders: action.reminders
      });

    case UPDATE_REMINDER:
      return Object.assign(
        {},
        state,
        {
          reminderInEditMode: action.reminder,
          reminders: updatedReminders(state.reminders, action.reminderAttributes)
        }
      );

    default:
      return state;
  }
};

function updatedReminders(currentReminders, newReminderAttributes) {
  return currentReminders.map((currentReminder) => {
    return currentReminder.id === newReminderAttributes.id ? newReminderAttributes : currentReminder;
  });
}
