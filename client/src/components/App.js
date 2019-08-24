import React, { Component } from 'react';
import { Container, Box, Heading } from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {
  state = {
    brands: []
  };
  async componentDidMount() {
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
          brands {
            _id
            name
            description
            image {
              url
            }
          }
        }`
        }
      });
      this.setState({
        brands: data.brands
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Container>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
      </Container>
    );
  }
}

export default App;
