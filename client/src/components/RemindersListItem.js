import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';
import {editReminder, fetchReminder, incrementLikes, updateReminder} from "../actions";
import { connect } from 'react-redux';

class RemindersListItem extends React.Component {
  constructor(props) {
    super(props);

    const {id, title, time, recipient_email_address_values, message, likes} = props.reminder;

    this.state = {
      reminder: {
        id,
        title,
        time,
        message,
        recipient_email_address_values,
        likes
      }
    }
  }

  handleClick = () => {
    return this.props.onClick(this.props.reminder)
  };

  handleLikeClick = () =>  {
    this.setState({
      reminder: {
        ...this.state.reminder,
        likes: this.state.reminder.likes + 1
      }
    }, function() {
      this.props.performReminderUpdate(this.state.reminder);
    });
  };

  // callApi = () => {
  //   console.log('a')
  //   const url = '/api/reminders';
  //   fetch(url)
  //     .then(response => {
  //       if (response.ok) {
  //         console.log('b')
  //         return response.json()
  //       } else {
  //         throw new Error(response.statusText)
  //       }
  //     })
  //     .then(json => console.log('c', json))
  //     .catch(err => console.log('d', err))
  //   console.log('e')
  //
  //   // a e b c + json
  //
  //   // a e b d + err
  // }

  render() {
    const {reminder} = this.props;
    const deleteConfirmationPath = `/reminders/${reminder.id}/delete_confirmation`;

    return (
      <div className="tile">
        <Link className="deleteLink" to={deleteConfirmationPath}>
          x
        </Link>

        <h4>
          <Link to={`/reminders/${reminder.id}`} className="tile-link" onClick={this.handleClick}>
            {reminder.title}
          </Link>
        </h4>

        <p onClick={this.handleClick}>
          {reminder.message}
        </p>

        <div>
          <Button onClick={this.handleLikeClick}>
            Like?
          </Button>
          <p>
            {this.state.reminder.likes}
          </p>
        </div>

        {/*<div>*/}
          {/*<Button onClick={this.callApi}>*/}
            {/*Call Api*/}
          {/*</Button>*/}
        {/*</div>*/}
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    performReminderUpdate: (reminderAttributes) => {
      return dispatch(updateReminder(reminderAttributes));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(RemindersListItem)
