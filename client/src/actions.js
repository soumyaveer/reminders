export const ADD_REMINDER = 'ADD_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const EDIT_REMINDER = 'EDIT_REMINDER';
export const FETCH_REMINDERS = 'FETCH_REMINDERS';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';

const rootURL = '/api/reminders';

export function addReminder(reminderAttributes) {
  const {title, message, recipient_email_address_values, time} = reminderAttributes;

  const requestBody = {
    reminder: {
      message,
      recipient_email_address_values,
      time,
      title
    }
  };

  return dispatch => {
    return fetch(rootURL, {
      body: JSON.stringify(requestBody),

      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },

      method: 'POST'
    })
      .then(request => request.json())
      .then(json => dispatch(handleReminderAddition(json)));
  };
};

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

export function editReminder(reminder) {
  return {
    reminderInEditMode: reminder,
    type: EDIT_REMINDER
  }
};

export function fetchReminders() {
  return dispatch => {
    return fetch(rootURL)
      .then(request => request.json())
      .then(json => dispatch(handleFetchedReminders(json)));
  };
};

export function updateReminder(unsavedReminderAttributes) {
  const { message, recipient_email_address_values, time, title } = unsavedReminderAttributes;

  const requestBody = {
    reminder: {
      message,
      recipient_email_address_values,
      time,
      title
    }
  };

  const patchURL = `/api/reminders/${unsavedReminderAttributes.id}.json`;

  return dispatch => {
    return fetch(patchURL, {
      body: JSON.stringify(requestBody),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'PUT'
    })
      .then(request => request.json())
      .then(savedReminderAttributes => dispatch(handleReminderUpdation(savedReminderAttributes)));
  }
}

function handleReminderUpdation(reminderAttributes) {
  return {
    reminderAttributes,
    type: UPDATE_REMINDER
  }
}

function handleReminderAddition(reminderAttributes) {
  return {
    reminderAttributes,
    type: ADD_REMINDER
  }
}

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
