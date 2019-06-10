import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class HeaderSearch extends React.Component  {
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { onSearch, onChange, keyword } = this.props;

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Nhập từ khóa..."
          value={keyword} 
          onChangeText={this.handleChange}
          name="keyword"
          lightTheme={true}
          containerStyle={{
            backgroundColor: 'transparent', 
            borderTopWidth: 0, 
            borderBottomWidth: 0,
            width: '90%'
          }}
          autoFocus
          onSubmitEditing={onSearch}
          inputContainerStyle={{backgroundColor: 'rgb(255, 255, 255)'}}
          inputStyle={{color: '#000'}}
        />
        <TouchableOpacity onPress={onSearch}>
          <Icon 
            name='ios-search'
            size={30} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
})