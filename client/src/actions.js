export const FETCH_REMINDERS = 'FETCH_REMINDERS';
export const DELETE_REMINDER = 'DELETE_REMINDER';

const rootURL = '/api/reminders';

export function deleteReminder(reminderId) {
  const deleteURL = `${rootURL}/${reminderId}`;

  return dispatch => {
    return fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    })
      .then(request => request.json())
      .then(json => dispatch(handleReminderDeletion(reminderId)));
  };
};

export function fetchReminders() {
  return dispatch => {
    return fetch(rootURL)
      .then(request => request.json())
      .then(json => dispatch(handleFetchedReminders(json)));
  };
};

function handleFetchedReminders(reminders) {
  return {
    reminders,
    type: FETCH_REMINDERS
  };
}

function handleReminderDeletion(reminderId) {
  return {
    reminderId,
    type: DELETE_REMINDER
  };
}
