import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import ProductListItem from '../components/ProductListItem';
import Header from './../components/Header';

export default class Products extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header />,
      headerStyle: { backgroundColor: '#377ECC' },
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 1,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/509540405_13.jpg',
          name: 'Máy chà sàn công nghiệp',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
        {
          id: 2,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/308262503_untitled3_copy.png',
          name: 'Máy chà sàn liên hợp EUROMAC ',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
        {
          id: 3,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/45310593_untitled2_copy.png',
          name: 'Máy hút bụi Nước hút thảm',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
        {
          id: 4,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/616387771_9.jpg',
          name: 'Máy hút bụi công nghiệp',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
        {
          id: 5,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/1430376714_orc1283481748.jpg',
          name: 'Hóa Chất Đánh Bóng Sàn Gạch',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
      ]
    }
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.scrollView}
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <ProductListItem 
                product={item}
                onPress={() => navigation.navigate('ProductDetail', {
                  productName: item.name,
                  productImage: item.image,
                  productCode: item.code,
                  productDesc: item.description
                })}
              />
            </View>
          )}
          keyExtractor={item => `${item.id}`}
        />
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
  }
})