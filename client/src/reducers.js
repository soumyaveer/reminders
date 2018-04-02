import { FETCH_REMINDERS } from "./actions";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_REMINDERS:
      return Object.assign({}, state, {
        editingReminderId: null,
        reminders: action.reminders
      });
    default:
      return state;
  }
};
