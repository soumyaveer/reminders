import React from 'react';
import {withRouter} from 'react-router';
import Button from './Button'

const rootUrl = '/api/reminders';

class DeleteConfirmation  extends React.Component {
  handleDelete = () => {
    this.deleteReminder(this.props.match.params.id);
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
      .then (response =>
        this.redirectToHome())
  };

  redirectToHome = () => {
    this.props.history.push('/')
  };

  render() {
    return (
      <div className="delete-confirmation">
        <h3>Do you want to delete this reminder?</h3>

        <span>
          <Button className="delete-button" onClick={this.handleDelete}>Yes</Button>
          <Button className="button" onClick={this.redirectToHome} >No</Button>
        </span>
      </div>
    )
  }

};

export default withRouter(DeleteConfirmation);
