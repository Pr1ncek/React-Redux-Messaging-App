import React from 'react';
import {
  Grid,
  Header,
  Icon,
  Dropdown
} from '../../../node_modules/semantic-ui-react';

class UserPanel extends React.Component {
  dropdownOptions = () => [
    {
      text: (
        <span>
          Signed in as <strong>User Name Here</strong>
        </span>
      ),
      disabled: true,
      key: 'user'
    },
    {
      text: <span>Change Avatar</span>,
      key: 'avatar'
    },
    {
      text: <span>Sign Out</span>,
      key: 'signout'
    }
  ];

  render() {
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Messenger</Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header
            style={{ padding: '0.25em', marginTop: '2em' }}
            as="h4"
            inverted
          >
            <Dropdown
              trigger={
                <span>
                  <Icon name="user" />
                  User
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
