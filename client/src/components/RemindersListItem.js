import React from 'react';
import Time from 'react-time-format';


class RemindersListItem extends React.Component {

  handleOnClick = () => {
    this.props.onClick(this.props.reminder.id)
  };

  render() {
    return(
      <div className="tile">
        <h4 onClick={this.handleOnClick}>
          {this.props.reminder.title}
        </h4>
        <p onClick={this.handleOnClick}>
          {this.props.reminder.message}
        </p>
      </div>
    )
  }
}

export default RemindersListItem;
