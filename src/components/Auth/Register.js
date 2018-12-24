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
    confirmPassword: '',
    errors: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    if (this.isFormValid()) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => console.log(createdUser))
        .catch(err => console.error(err));
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    return true;
  };

  isFormEmpty = ({ username, email, password, confirmPassword }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) return false;
    else if (password !== confirmPassword) return false;

    return true;
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  render() {
    const { username, email, password, confirmPassword, errors } = this.state;

    return (
      <Grid textAlign="center" className="app" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            <Icon name="terminal" color="teal" size="large" />
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
              <Button color="teal" size="large" fluid type="submit">
                Sign Up!
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              {this.displayErrors(errors)}
              {console.log(this.displayErrors(errors))}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
