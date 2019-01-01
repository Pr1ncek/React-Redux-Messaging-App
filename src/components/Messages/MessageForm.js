import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from 'firebase';

class MessageForm extends Component {
  state = {
    message: '',
    loading: false,
    errors: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendMessage = () => {
    const { message } = this.state;
    const { messagesRef, currentChannel } = this.props;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(this.createMessage())
        .then(() => this.setState({ loading: false, message: '', errors: [] }))
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: 'Add a message' })
      });
    }
  };

  createMessage = () => {
    const { userId, userName, avatar } = this.props;
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      content: this.state.message,
      user: {
        id: userId,
        name: userName,
        avatar
      }
    };
    return message;
  };

  render() {
    const { errors, message } = this.state;
    return (
      <Segment className="message_form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: '0.7em' }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
          value={message}
          onChange={this.handleChange}
          className={
            errors.some(error => error.message.includes('message'))
              ? 'error'
              : ''
          }
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentChannel: state.channel.currentChannel,
  userId: state.user.currentUser.uid,
  userName: state.user.currentUser.displayName,
  avatar: state.user.currentUser.photoURL
});

export default connect(mapStateToProps)(MessageForm);
