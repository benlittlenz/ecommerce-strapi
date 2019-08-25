import React, { Component } from 'react';
import { Container, Box, Heading, Icon, Spinner, Card, Image, Text, SearchField } from 'gestalt';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {
  state = {
    brands: [],
    search: '',
    loadingBrands: true
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
        brands: data.brands,
        loadingBrands: false
      });
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  onChange = ({ value }) => {
    this.setState({
      search: value
    });
  };

  filterBrands = ({ search, brands }) => {
    return brands.filter(brand => {
      return (
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  render() {
    const { search, loadingBrands } = this.state;
    return (
      <Container>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.onChange}
            value={search}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon
              icon="filter"
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
          {this.filterBrands(this.state).map(brand => (
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
        {<Loader show={loadingBrands}/>}
      </Container>
    );
  }
}

export default App;
