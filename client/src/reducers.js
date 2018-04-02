import {FETCH_REMINDERS, DELETE_REMINDER, ADD_REMINDER} from "./actions";

export default function rootReducer(state, action) {
  if (!state) {
    state = {
      editingReminderId: null,
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
          editingReminderId: action.reminderAttributes.id
        }
      );

    case DELETE_REMINDER:
      return Object.assign({}, state, {reminders: state.reminders.filter(reminder => reminder.id !== action.reminderId)});
    case FETCH_REMINDERS:
      return Object.assign({}, state, {
        editingReminderId: null,
        reminders: action.reminders
      });
    default:
      return state;
  }
};
