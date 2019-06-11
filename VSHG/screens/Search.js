import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Tab, Tabs } from 'native-base';

import ProductListItem from '../components/ProductListItem';
import ServiceListItem from '../components/ServiceListItem';
import HeaderSearch from '../components/HeaderSearch';
import Header1 from '../components/Header';
import callApi from '../callApi';

export default class Search extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header1 titleScreen="Tìm kiếm"  onPress={() => navigation.navigate('Search')} />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerTintColor: 'white',
      headerBackTitleStyle: { display: 'none' }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      keyword: '',
      spinner: false,
      services: []
    }
  }

  onReplaceKeyword = keyword => {
    var str = keyword;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}

  onChange = keyword => {
    this.setState({ keyword });
  }

  onSearch = () => {
    const { keyword } = this.state;
    this.setState({ spinner: true })

    callApi('product/allproduct', 'GET', null).then(res => {
      const productsFiltered = res.data
      .filter(product => product.status === '1' && product.cid !== '180')
      .filter((product) => {
        return (
          this.onReplaceKeyword(product.vn_name)
            .toLowerCase()
            .indexOf(this.onReplaceKeyword(keyword).toLowerCase()) !== -1
        )
      });
      this.setState({ 
        products: productsFiltered,
        spinner: false 
      })
    });

    callApi('service/allservice', 'GET', null).then(res => {
      const servicesFiltered = res.data
      .filter(service => service.status === '1')
      .filter((service) => {
        return (
          this.onReplaceKeyword(service.vn_name)
            .toLowerCase()
            .indexOf(this.onReplaceKeyword(keyword).toLowerCase()) !== -1
        )
      });
      this.setState({ 
        services: servicesFiltered,
      })
    });
  }

  render() {
    const { navigation } = this.props;
    const { products, keyword, services } = this.state;

    return (        
      <Container>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        <HeaderSearch onSearch={this.onSearch} onChange={this.onChange} keyword={keyword} />
        <Tabs>
          <Tab heading="Sản phẩm">
            <ScrollView>
              {
                (products !== null && products.length > 0)
                ? <Text style={styles.empty}>Có {products.length} sản phẩm được tìm thấy!</Text>
                : <Text style={styles.empty}>Không tìm thấy sản phẩm nào!</Text>
              }
              <FlatList 
                style={styles.scrollView}
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.wrapper}>
                    <ProductListItem 
                      product={item}
                      onPress={() => navigation.navigate('ProductDetail', {
                        productName: item.vn_name,
                        productImage: item.image_link,
                        productDesc: item.vn_detail
                      })}
                    />
                  </View>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </ScrollView>
          </Tab>
          <Tab heading="Dịch vụ">
            <ScrollView>
              {
                (services !== null && services.length > 0)
                ? <Text style={styles.empty}>Có {services.length} dịch vụ được tìm thấy!</Text>
                : <Text style={styles.empty}>Không tìm thấy dịch vụ nào!</Text>
              }
              <FlatList 
                style={styles.scrollView}
                data={services}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.wrapper}>
                    <ServiceListItem 
                      service={item}
                      onPress={() => navigation.navigate('ServiceDetail', {
                        serviceName: item.vn_name,
                        serviceImage: item.image_link,
                        serviceDesc: item.vn_detail
                      })}
                    />
                  </View>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </ScrollView>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingBottom: 50,
  },
  scrollView: {
    paddingHorizontal: 7.5,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  empty: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
})