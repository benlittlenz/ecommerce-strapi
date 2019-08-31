import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import ToastMessage from './ToastMessage';
import { getCart, calcPrice } from '../utils';

class Checkout extends React.Component {
  state = {
    cartItems: [],
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: ''
  };

  componentDidMount() {
    this.setState({ cartItems: getCart() });
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleConfirmOrder = async event => {
    event.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.showToast('Fill in all feilds');
      return;
    }
  };

  isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
    return !address || !postalCode || !city || !confirmationEmailAddress;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
  };
  render() {
    const { toast, toastMessage, cartItems } = this.state;
    return (
      <Container>
        <Box
          color="darkWash"
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Heading color="midnight">Checkout</Heading>
          {cartItems.length > 0 ? <React.Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
            marginTop={2}
            marginBottom={6}
          >
            <Text color="darkGray" italic>{cartItems.length} for checkout</Text>
            <Box padding={2}>
              {cartItems.map(item => (
                <Box key={item._id} padding={1}>
                  <Text color="midnight">
                    {item.name} x {item.quantity} - ${item.quantity * item.price}
                  </Text>"
                </Box>
              ))}
            </Box>
            <Text bold>Total Amount: {calcPrice(cartItems)}</Text>
          </Box>
          <form
            style={{
              display: 'inlineBlock',
              textAlign: 'center',
              maxWidth: 450
            }}
            onSubmit={this.handleConfirmOrder}
          >
            <TextField
              id="address"
              type="text"
              name="address"
              placeholder="Shipping Address"
              onChange={this.handleChange}
            />
            <TextField
              id="postalCode"
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={this.handleChange}
            />
            <TextField
              id="City"
              type="text"
              name="City"
              placeholder="City of Residense"
              onChange={this.handleChange}
            />
            <TextField
              id="confirmationEmailAddress"
              type="email"
              name="confirmationEmailAddress"
              placeholder="Confirm Email Address"
              onChange={this.handleChange}
            />
            <button id="stripe__button" type="submit">
              Submit
            </button>
          </form>
          </React.Fragment> : (
            <Box color="darkWash" shape="rounded" padding={4}>
              <Heading align="center" color="watermelon">Your Cart is Empty</Heading>
            </Box>
          )}
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

export default Checkout;
