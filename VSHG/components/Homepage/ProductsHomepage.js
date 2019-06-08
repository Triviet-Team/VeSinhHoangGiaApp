import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ProductListItem from './../ProductListItem';

export default class ProductsHomepage extends React.Component {

  render() {
    const { navigation, products } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLarge}>Sản phẩm nổi bật</Text>
          <TouchableOpacity
            style={styles.titleSmall}
            onPress={() => navigation.navigate('AllProducts')}
          >
            <Text style={{ color: '#377ECC', marginRight: 5 }}>
              Tất cả sản phẩm
            </Text>
            <Icon name="plus" size={18} color="#377ECC" />
          </TouchableOpacity>
        </View>
        {
          (products !== null && products.length > 0)
          && <FlatList 
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
        }
        <TouchableOpacity
          style={styles.titleAll}
          onPress={() => navigation.navigate('AllProducts')}
        >
          <Text style={styles.titleAllText}>
            Xem tất cả sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  scrollView: {
    paddingHorizontal: 7.5,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: '500',
  },
  titleSmall: {
    marginTop: 5,
    flexDirection: 'row'
  },
  titleAll: {
    alignItems: 'center',
    marginVertical: 15,
  },
  titleAllText: { 
    backgroundColor: '#377ECC',
    paddingVertical: 12,
    paddingHorizontal: 30,
    color: '#fff', 
    width: 250, 
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 5,
  }
})