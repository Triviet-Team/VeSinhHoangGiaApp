import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import {  Item, Input, Icon } from 'native-base';

const { width } = Dimensions.get('window')

export default function HeaderSearch(props) {
  const { onSearch, onChange, keyword } = props;
  
  return (
      <Item style={styles.input} >
        <Input 
          style={{ paddingHorizontal: 10 }}
          onSubmitEditing={onSearch}
          onChangeText={onChange}
          value={keyword} 
          placeholder="Nhập tên sản phẩm, dịch vụ..."
          name="keyword"
          autoFocus
        />
        <Icon onPress={onSearch} name="ios-search" />
      </Item>
  )
};

const styles = StyleSheet.create({
  input: {
    width: width - 80,
    backgroundColor: '#fff',
    right: -10,
    height: 40,
    borderRadius: 3,
  }
})