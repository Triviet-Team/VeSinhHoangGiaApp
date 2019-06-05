import React from 'react';
import { View } from 'react-native';

import Header from './../components/Header';

export default class ProductDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header propsKeyword={navigation.getParam('productName')} />,
      headerStyle: { backgroundColor: '#377ECC' },
      headerBackTitleStyle: 'Back'
    }
  }

  render() {
    return (
      <View>
        <Header />
      </View>
    )
  }
}