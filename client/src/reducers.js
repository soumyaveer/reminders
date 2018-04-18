import {
  FETCH_REMINDER,
  FETCH_REMINDERS,
  DELETE_REMINDER,
  ADD_REMINDER,
  UPDATE_REMINDER,
  EDIT_REMINDER,
  INCREMENT_LIKES
} from "./actions";

export default function rootReducer(state, action) {
  if (!state) {
    state = {
      reminderInDetailMode: null,
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
          reminderInDetailMode: null,
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
      return Object.assign({}, state, {reminderInEditMode: action.reminderInEditMode});

    case FETCH_REMINDER:
      return Object.assign({}, state, {
        reminderInDetailMode: action.reminderAttributes,
        reminderInEditMode: null
      });

    case FETCH_REMINDERS:
      return Object.assign({}, state, {
        reminderInDetailMode: null,
        reminderInEditMode: null,
        reminders: action.reminders
      });

    case INCREMENT_LIKES:
      const i = action.index;
      return Object.assign(
        {},
        state,
        {
          reminders: incrementLikes(state.reminders, action.index)
        }
      );

    case UPDATE_REMINDER:
      return Object.assign(
        {},
        state,
        {
          // reminderInEditMode: action.reminderAttributes,
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

function incrementLikes(currentReminders, reminderIndex) {
  return [
    ...currentReminders.slice(0,reminderIndex), // before the one we are updating
    {...currentReminders[reminderIndex], likes: currentReminders[reminderIndex].likes + 1},
    ...currentReminders.slice(reminderIndex + 1), // after the one we are updating
  ]
}
