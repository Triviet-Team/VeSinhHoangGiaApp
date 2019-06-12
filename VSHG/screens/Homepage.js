import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import callApi from './../callApi';

import Header from './../components/Header';
import Banner from './../components/Homepage/Banner';
import ServicesHomepage from './../components/Homepage/ServicesHomepage';
import CategoriesHomepage from './../components/Homepage/CategoriesHomepage';
import ProductsHomepage from './../components/Homepage/ProductsHomepage';


export default class Homepage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header 
        titleScreen="Vệ sinh Hoàng Gia" 
        onPress={() => navigation.navigate('Search')}  
      />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerBackTitleStyle: { display: 'none' }
    }
  }
  
  constructor(props) {
    super(props);

    this.state = {
      banners: [],
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
    this.onFetchBanner();
  }

  onFetchBanner = () => {
    this.setState({ spinner: true });

    callApi('ads/allads', 'GET', null).then(res => {
      const bannersPublic = res.data
        .filter(banner => banner.status === "1" && banner.cid === "6")
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        banners: bannersPublic,
        spinner: false,
        refreshing: false,
      })
    })
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
    this.onFetchServices();
    this.onFetchProducts();
    this.onFetchBanner();
  };

  render() {
    const { banners, categories, services, products, refreshing, spinner } = this.state;
    const { navigation } = this.props

    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Spinner
          visible={spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        <Banner banners={banners} />
        <CategoriesHomepage 
          navigation={navigation} 
          categories={categories}
        />
        <ServicesHomepage 
          navigation={navigation} 
          services={services}
        />
        <ProductsHomepage 
          navigation={navigation} 
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