import React from 'react';
import { ScrollView, Text, Image, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import HTML from 'react-native-render-html';

import Header from './../components/Header';

export default class ProductDetail extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerTintColor: 'white'
    }
  }

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('productName')
    const image = navigation.getParam('productImage')
    const description = navigation.getParam('productDesc');
    const imgDirUrl = 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350';
    
    return (
      <View>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <Text style={styles.name}>{ name }</Text>
              <View style={styles.imgBox}>
                <Image resizeMode="contain" style={styles.img} source={{ uri: `${imgDirUrl}/${image}` }} />
              </View>
            </View>

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Chi tiết sản phẩm</Text>
              <HTML html={description} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.9} style={styles.order}>
          <Text style={styles.orderText} onPress={ ()=> Linking.openURL('tel:0912345678')}>
            LIÊN HỆ ĐẶT MUA
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f9f9f9'
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  imgBox: {
    flex: 1,
  },
  img: {
    height: 300,
    flex: 1,
    width: null,
    marginBottom: 15,
  },
  order: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#377ECC',
    alignItems: 'center',
    marginBottom: 15,
    position: 'absolute',
    bottom: -15,
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    padding: 15,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  descriptionTitle: {
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    fontSize: 20,
    fontWeight: '500',
  }
})