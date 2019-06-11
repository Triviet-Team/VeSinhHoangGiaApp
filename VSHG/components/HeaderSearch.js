import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

export default function HeaderSearch(props) {
  const { onSearch, onChange, keyword } = props;

  return (
    <SearchBar
      placeholder="Nhập tên sản phẩm, dịch vụ..."
      value={keyword} 
      onChangeText={onChange}
      name="keyword"
      lightTheme={true}
      containerStyle={{
        backgroundColor: '#fff', 
        borderTopWidth: 0, 
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        position: 'relative',
        top: 0,
        width: width,
        zIndex: 1000,
      }}
      autoFocus
      onSubmitEditing={onSearch}
      inputContainerStyle={{backgroundColor: 'rgb(255, 255, 255)', width: width - 30, height: 40 }}
      inputStyle={{color: '#000'}}
    />
  )
}