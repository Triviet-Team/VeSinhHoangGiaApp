import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class Header extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    }
  }

  onSearch = keyword => {
    this.setState({ keyword });
  }

  render() {
    const { keyword } = this.state;
    const { propsKeyword } = this.props;

    return (
      <SearchBar
        placeholder={propsKeyword ? propsKeyword : "Nhập từ khóa..."}
        onChangeText={this.onSearch}
        value={keyword}
        lightTheme={true}
        containerStyle={{
          backgroundColor: 'transparent', 
          width: '100%', 
          borderTopWidth: 0, 
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{backgroundColor: 'rgb(255, 255, 255)'}}
        inputStyle={{color: '#000'}}
      />
    )
  }
}