import React from 'react';
import Button from './Button'
import {deleteReminder} from "../actions";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

class DeleteConfirmation  extends React.Component {
  render() {
    const reminderId = this.props.match.params.id;

    return (
      <div className="delete-confirmation">
        <h3>Do you want to delete this reminder?</h3>
        <span>
          <Button className="delete-button" onClick={() => this.props.handleDeleteClick(reminderId, this.props.history)}>Yes</Button>
          <Link to="/" className="button">No</Link>
        </span>
      </div>
    )
  }
};

const mapStateToProps = () => {
  return {};
};

// https://learn.co/tracks/full-stack-web-development-v3/redux/redux-library/map-dispatch-to-props-readme
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteClick: (reminderId, history) => {
      dispatch(deleteReminder(reminderId)).then(() => { history.push('/') });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmation);
