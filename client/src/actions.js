export const FETCH_REMINDERS = 'FETCH_REMINDERS';

function receiveReminders(reminders) {
  return {
    reminders,
    type: FETCH_REMINDERS
  };
}

export function fetchReminders() {
  return dispatch => {
    return fetch('/api/reminders')
      .then(request => request.json())
      .then(json => dispatch(receiveReminders(json)));
  };
};
