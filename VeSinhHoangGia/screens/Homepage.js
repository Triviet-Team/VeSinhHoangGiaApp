import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ProductListItem from '../components/ProductListItem';
import Header from './../components/Header';

export default class Homepage extends React.Component {
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
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/509540405_13.jpg',
          name: 'Máy chà sàn công nghiệp 123',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },{
          id: 3,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/509540405_13.jpg',
          name: 'Máy chà sàn công nghiệp 321',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },{
          id: 4,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/509540405_13.jpg',
          name: 'Máy chà sàn công nghiệp 1222223',
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
          renderItem={({ item }) => (
            <ProductListItem 
              product={item}
              onPress={() => navigation.navigate('ProductDetail', {
                product: item
              })}
            />
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
    marginTop: 15,
  },
  scrollView: {
    paddingHorizontal: 15
  }
})