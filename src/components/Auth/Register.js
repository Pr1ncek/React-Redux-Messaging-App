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
import md5 from 'md5';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ loading: true, errors: [] });
      const { email, password, username } = this.state;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
            })
            .then(() => {
              console.log(createdUser);
              this.setState({ loading: false });
              this.clearForm();
              this.saveUserToDB(createdUser).then(() =>
                console.log('User saved to DB')
              );
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  saveUserToDB = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  clearForm = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: []
    });
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

  handleInputError = inputName => {
    return this.state.errors.some(error =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errors,
      loading
    } = this.state;

    return (
      <Grid textAlign="center" className="app" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            <Icon name="terminal" color="teal" size="large" />
            Welcome To Messenger
          </Header>
          <Form size="huge" onSubmit={this.onSubmit} className="register-form">
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
                className={this.handleInputError('username')}
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
                className={this.handleInputError('email')}
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
                className={this.handleInputError('password')}
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
                className={this.handleInputError('password')}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color="teal"
                size="large"
                fluid
                type="submit"
              >
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
