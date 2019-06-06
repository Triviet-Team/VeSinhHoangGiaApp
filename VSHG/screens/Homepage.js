import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import ProductListItem from '../components/ProductListItem';
import Header from './../components/Header';

const { width: screenWidth } = Dimensions.get('window')

export default class Homepage extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
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
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/1048123779_55.jpg',
          name: 'Máy chà sàn công nghiệp 123',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },{
          id: 3,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/1143226388_4.jpg',
          name: 'Máy chà sàn công nghiệp 321',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },{
          id: 4,
          image: 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350/611944059_7.jpg',
          name: 'Máy chà sàn công nghiệp 1222223',
          code: '553SM',
          description: 'lorem lorem',
          category: 1
        },
      ]
    }
  }

  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item.image }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <Text style={styles.title} numberOfLines={2}>
                { item.title }
            </Text>
        </View>
    );
}

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

    return (
      <View style={styles.container}>
       <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={this.state.products}
          renderItem={this._renderItem}
          hasParallaxImages={true}
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
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})