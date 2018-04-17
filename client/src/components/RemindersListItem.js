import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';

class RemindersListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likesCounter: 0
    }
  }


  handleClick = () => {
    return this.props.onClick(this.props.reminder)
  };

  handleLikes = () =>  {
    console.log(this.state);

    this.setState({
      likesCounter: (this.state.likesCounter + 1)
    })
  }

  callApi = () => {
    console.log('a')
    const url = '/api/remindfdsfsders';
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log('b')
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      })
      .then(json => console.log('c', json))
      .catch(err => console.log('d', err))
    console.log('e')

    // a e b c + json

    // a e b d + err
  }

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
          <Button onClick={this.handleLikes}>
            Like?
          </Button>
          <p>
            {this.state.likesCounter}
          </p>
        </div>
        <div>
          <Button onClick={this.callApi}>
            Call Api
          </Button>
          <p>
            {this.state.likesCounter}
          </p>
        </div>

      </div>
    )
  }
}


export default RemindersListItem;
