import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      isDisplaySearchForm: false
    }
  }

  onSearch = keyword => {
    this.setState({ keyword });
  }

  onDisplaySearchForm = () => {
    this.setState({
      isDisplaySearchForm: !this.state.isDisplaySearchForm
    })
  }

  render() {
    const { keyword, isDisplaySearchForm } = this.state;
    const { titleScreen } = this.props;

    console.log(keyword);

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{ titleScreen }</Text>
        <TouchableOpacity onPress={this.onDisplaySearchForm}>
          <Icon 
            name={isDisplaySearchForm ? 'md-close' : 'ios-search' }
            size={30} 
            color="#fff" 
          />
        </TouchableOpacity>
        <SearchBar
          placeholder="Nhập từ khóa..."
          onChangeText={this.onSearch}
          value={keyword}
          lightTheme={true}
          containerStyle={{
            backgroundColor: 'transparent', 
            width: isDisplaySearchForm ? '95%' : 0, 
            borderTopWidth: 0, 
            borderBottomWidth: 0,
            position: 'absolute',
            top: -12.5,
          }}
          inputContainerStyle={{backgroundColor: 'rgb(255, 255, 255)'}}
          inputStyle={{color: '#000'}}
        />
      </View>
    )
  }
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