import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from 'firebase';
import { connect } from 'react-redux';

class UserPanel extends React.Component {
  dropdownOptions = displayName => [
    {
      text: (
        <span>
          Signed in as <strong>{displayName}</strong>
        </span>
      ),
      key: 'user'
    },
    {
      text: <span>Change Avatar</span>,
      key: 'avatar'
    },
    {
      text: <span onClick={this.handleSignout}>Sign Out</span>,
      key: 'signout'
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Signed Out!'));
  };

  render() {
    const { currentUser } = this.props;
    const displayName =
      currentUser && currentUser.displayName ? currentUser.displayName : 'User';
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Messenger</Header.Content>
            </Header>

            {/* User Dropdown */}
            <Header
              style={{ padding: '0.25em', marginTop: '2em' }}
              as="h4"
              inverted
            >
              <Dropdown
                trigger={
                  <span>
                    {currentUser && currentUser.photoURL ? (
                      <Image src={currentUser.photoURL} spaced="right" avatar />
                    ) : (
                      <Icon name="user" />
                    )}

                    {displayName}
                  </span>
                }
                options={this.dropdownOptions(displayName)}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);
