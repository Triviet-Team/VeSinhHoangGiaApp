import React from 'react';
import { Text } from 'react-native';

import Header from '../components/Header';

export default class Contact extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header titleScreen="Thông tin liên hệ" />,
      headerStyle: { backgroundColor: '#377ECC' },
      headerBackTitleStyle: { display: 'none' }
    }
  }

  render() {
    return (
      <Text>Contact</Text>
    )
  }
}