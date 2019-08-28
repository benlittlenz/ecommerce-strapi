import React, { Component } from 'react';
import { Box, Button, Container, Heading, Text, TextField } from 'gestalt';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
import ToastMsg from './ToastMessage';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({
      [event.target.name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormEmpty()) {
      this.showToast('Fill in all feilds');
    }
  };

  showToast = toastMessage => {
    this.setState({
      toast: true,
      toastMessage
    });
    setTimeout(() => {
      this.setState({ toast: false, toastMessage: '' });
    }, 5000);
  };

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  render() {
    const { toastMessage, toast } = this.state;
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#ebe2da'
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          <form
            style={{
              display: 'inlineBlock',
              textAlign: 'center',
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            <Box marginBottom={2} display="flex" direction="column" alignItems="center">
              <Heading color="midnight">Get Started</Heading>
              <Text italic color="orchid">
                Sign up to order some brews!
              </Text>
              <Box marginTop={2}>
                <TextField
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
              </Box>
              <Box marginTop={2}>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                />
              </Box>
              <Box marginTop={2}>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Box>
              <Box marginTop={2}>
                <Button inline color="blue" text="Submit" type="submit" />
              </Box>
            </Box>
          </form>
        </Box>
        <ToastMsg show={toast} message={toastMessage} />
      </Container>
    );
  }
}

export default Signup;
