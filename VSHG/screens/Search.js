import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ProductListItem from '../components/ProductListItem';
import HeaderSearch from '../components/HeaderSearch';
import callApi from '../callApi';

export default class Search extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <HeaderSearch onSearch={this.onSearch} onChange={this.onChange} />,
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
      spinner: false
    }
  }

  onChange = keyword => {
    this.setState({ keyword });
    console.log(keyword);
  }

  onSearch = () => {
    const { products, keyword } = this.state;

    callApi('product/allproduct', 'GET', null).then(res => {

      if (keyword) {
        const productsFiltered = res.data
        .filter(product => product.is_home === '1' && product.cid !== '180')
        .filter((product) => {
          return product.vn_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });
        this.setState({ products: productsFiltered })
      }
    })
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;
    console.log(products);


    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        {
          (products !== null && products.length > 0)
          ? <FlatList 
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
          : <View style={styles.empty}>
              <Text style={styles.emptyText}>Chưa có sản phẩm nào trong mục</Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  scrollView: {
    paddingHorizontal: 7.5,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  empty: {
    padding: 15,
  },
  emptyText: {
    fontSize: 16,
  }
})