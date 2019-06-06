import React from 'react';
import { Text } from 'react-native';

import Header from '../components/Header';

export default class Contact extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header />,
      headerStyle: { backgroundColor: '#377ECC' },
    }
  }

  render() {
    return (
      <Text>Contact</Text>
    )
  }
}