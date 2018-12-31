import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';

class Messages extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment className="messages">
          <Comment.Group>{/* Messages */}</Comment.Group>
        </Segment>
        <MessageForm />
      </React.Fragment>
    );
  }
}

export default Messages;
