import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Header(props)  {
  const { titleScreen, onPress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{ titleScreen }</Text>
      <TouchableOpacity onPress={onPress}>
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
    justifyContent: 'space-between',
    flex: 1
  },
  logo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
})