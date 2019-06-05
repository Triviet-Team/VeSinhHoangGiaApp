import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


export default function ProductListItem(props) {  
  const { product, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.box}>
        <Image 
          style={styles.img} 
          source={{ uri: product.image }} 
        />
        <View style={styles.detail}>
          <Text style={styles.name} numberOfLines={1}>{ product.name }</Text>
          <Text style={styles.code} numberOfLines={1}>MSP: { product.code }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    elevation: 2,
    padding: 10,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'white',
    margin: 7.5,
    borderRadius: 3
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  detail: {
    alignItems: 'flex-start',
    width: '100%'
  },
  name: {
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'left',
  },
  code: {
    textAlign: 'left',
    color: '#585858'
  }
})