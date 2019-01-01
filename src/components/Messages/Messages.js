import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from 'firebase';

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref('messages')
  };

  render() {
    const { messagesRef } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment className="messages">
          <Comment.Group>{/* Messages */}</Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef} />
      </React.Fragment>
    );
  }
}

export default Messages;
