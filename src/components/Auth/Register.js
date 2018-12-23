import React from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => console.log(createdUser))
      .catch(err => console.error(err));
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;

    return (
      <Grid textAlign="center" className="app" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: '60%' }}>
          <Header as="h1" color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Welcome To Messenger
          </Header>
          <Form size="huge" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="email"
                type="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="password"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="confirmPassword"
                type="password"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={this.handleChange}
              />
              <Button inverted color="orange" size="large" fluid type="submit">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
