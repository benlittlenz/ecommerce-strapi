import React, { Component } from 'react';
import { Container, Box, Heading, Icon, Card, Image, Text, SearchField } from 'gestalt';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {
  state = {
    brands: [],
    search: ''
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

  onChange = ({value}) => {
    this.setState({
      search: value
    })
  }

  render() {
    const { brands, search } = this.state;
    return (
      <Container>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.onChange}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon icon="filter"
              color={search ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        <Box shape="rounded" wrap display="flex" justifyContent="around">
          {brands.map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand.id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiURL}${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
