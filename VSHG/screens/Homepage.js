import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import callApi from './../callApi';

import Header from './../components/Header';
import Banner from './../components/Homepage/Banner';
import ServicesHomepage from './../components/Homepage/ServicesHomepage';
import CategoriesHomepage from './../components/Homepage/CategoriesHomepage';
import ProductsHomepage from './../components/Homepage/ProductsHomepage';

const cards = [
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/78c2d756dfe154d18e6c8b2c5d503cbe/5D8F792E/t51.2885-15/sh0.08/e35/p640x640/60281421_2319158248131071_2993096072439239636_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/1c2cd96e9e5ff9192efc0e3a534e6ba2/5D8DD6C0/t51.2885-15/sh0.08/e35/p640x640/60114620_335883707122529_3423228155080954832_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/898ab36b8c29045aa5c5333495a23a17/5D8CB6A8/t51.2885-15/sh0.08/e35/s640x640/54511124_828195200864914_2233949510347612166_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
];

export default class Homepage extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header titleScreen="Vệ sinh Hoàng Gia"/>,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerBackTitleStyle: { display: 'none' }
    }
  }
  
  constructor(props) {
    super(props);

    this.state = {
      banners: cards,
      categories: [],
      services: [],
      products: [],
      spinner: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.setState({ spinner: true })
    this.onFetchCategories();
    this.onFetchServices();
    this.onFetchProducts();
  }

  onFetchCategories = () => {
    this.setState({ spinner: true });

    callApi('product/category', 'GET', null).then(res => {
      const categoriesHomepage = res.data
        .filter(cate => cate.status === "1" && cate.pid === "173")
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        categories: categoriesHomepage,
        spinner: false,
        refreshing: false,
      })
    })
  }

  onFetchServices = () => {
    callApi('service/allservice', 'GET', null).then(res => {
      const serviceFeature = res.data
        .filter(service => service.home === '1')
        .splice(0, 6)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        services: serviceFeature,
        spinner: false,
        refreshing: false,
      })
    })
  }

  onFetchProducts = () => {
    this.setState({ spinner: true });

    callApi('product/allproduct', 'GET', null).then(res => {
      const data = res.data
        .filter(product => product.is_home === '1' && product.cid !== '180')
        .splice(0, 10)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        products: data,
        spinner: false,
        refreshing: false,
      })
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.onFetchCategories();
  };

  render() {
    const { banners, categories, services, products } = this.state;

    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        <Banner banners={banners} />
        <CategoriesHomepage 
          navigation={this.props.navigation} 
          categories={categories}
        />
        <ServicesHomepage 
          navigation={this.props.navigation} 
          services={services}
        />
        <ProductsHomepage 
          navigation={this.props.navigation} 
          products={products}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9'
  }
})