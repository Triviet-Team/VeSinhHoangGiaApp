import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Header(props)  {
  const { titleScreen, onPress } = props;

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.logo}>
        { titleScreen }
      </Text>
      <TouchableOpacity style={styles.searchBtn} onPress={onPress}>
        <Icon 
          name="ios-search"
          size={30} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flex: 1,
    alignItems: 'stretch',
  },
  logo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
    paddingRight: 50,
  },
  searchBtn: {
    position: 'absolute',
    right: 15,
    top: 0
  }
})