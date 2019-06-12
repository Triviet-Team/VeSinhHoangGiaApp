import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductListItem(props) {  
  const { product, onPress } = props;
  const imgDirName = 'https://vesinhcongnghiep.com.vn/uploads/images/product/350_350'

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.box}>
        <View style={styles.imgBox}>
          <Image 
            style={styles.img} 
            source={{ uri: `${imgDirName}/${product.image_link}` }} 
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.name} numberOfLines={2}>
            { product.vn_name }
          </Text>
          <Text style={styles.code} numberOfLines={1}>
            MSP: { product.vn_title }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    elevation: 2,
    padding: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'white',
    margin: 7.5,
    borderRadius: 3,
    width: width / 2 - 22.5,
    height: null
  },
  imgBox: {
    flex: 1,
  },
  img: {
    flex: 1,
    height: width / 2 - 30,
    width: null,
    resizeMode: "contain",
    marginBottom: 10,
  },
  detail: {
    alignItems: 'flex-start',
    width: '100%'
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'left',
    height: 35
  },
  code: {
    textAlign: 'left',
    color: '#585858'
  }
})