import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ProductListItem from '../components/ProductListItem';
import Header from './../components/Header';
import callApi from './../callApi';

export default class Products extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header propsKeyword={navigation.getParam('categoryName')} />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerTintColor: 'white',
      headerBackTitle: 'Trở về'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      spinner: false
    }
  }

  
  componentDidMount() {
    this.setState({ spinner: true });

    const { navigation } = this.props;
    const categoryId = navigation.getParam('categoryId');

    callApi('product/allproduct', 'GET', { cid: categoryId }).then(res => {
      const data = res.data
        .filter(product => {
          return product.cid === categoryId && product.status === '1'
        })
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        products: data,
        spinner: false
      })
    })
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

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
    flex: 1,
  },
  empty: {
    padding: 15,
  },
  emptyText: {
    fontSize: 16,
  }
})