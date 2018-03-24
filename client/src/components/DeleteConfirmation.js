import React from 'react';
import {withRouter, Redirect, browserHistory} from 'react-router';
import Button from './Button'

const rootUrl = 'http://localhost:3001/reminders';

class DeleteConfirmation  extends React.Component {
  constructor(props) {
    super(props);
    console.log("Passed props:", props);
  }

  handleDelete = (event) => {
    this.deleteReminder(this.props.match.params.id)
    this.props.history.push('/')

  };

  deleteReminder = (id) => {
    const deleteUrl = `${rootUrl}/${id}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
    })
      .then (response => console.log(response))
      .catch(error => console.log(error))
  };

  redirectToHome = () => {
    this.props.history.push('/')
  };

  render() {
    return (
      <div className="delete-confirmation">
        <h3>Do you want to delete this reminder?</h3>

        <span>
          <Button className="delete-button" onClick={this.handleDelete} >Yes</Button>
          <Button className="button" onClick={this.redirectToHome} >No</Button>
        </span>
      </div>
    )
  }

};

export default DeleteConfirmation;
