import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';
import {editReminder, fetchReminder, incrementLikes, updateReminder} from "../actions";
import { connect } from 'react-redux';

class RemindersListItem extends React.Component {

  handleClick = () => {
    return this.props.onClick(this.props.reminder)
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
    const {reminder, index} = this.props;

    const deleteConfirmationPath = `/reminders/${reminder.id}/delete_confirmation`;
    return (
      <div className="tile">
        <Link className="deleteLink" to={deleteConfirmationPath}>
          x
        </Link>

        <h4>
          <Link to={`/reminders/${reminder.id}`} className="tile-link">
            {reminder.title}
          </Link>
        </h4>

        <p onClick={this.handleClick}>
          {reminder.message}
        </p>

        <div>
          <Button className="like-button" onClick={() => this.props.incrementLikes(index)}>
            &hearts; {this.props.reminder.likes}
          </Button>
          <p>
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
    incrementLikes: (reminderIndex) => {
      return dispatch(incrementLikes(reminderIndex))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(RemindersListItem)
