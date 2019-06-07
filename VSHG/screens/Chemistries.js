import React from 'react';
import { Text } from 'react-native';

import Header from './../components/Header';

export default class Chemistries extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header titleScreen="Hóa chất" />,
      headerStyle: { backgroundColor: '#377ECC' },
      headerBackTitleStyle: { display: 'none' }
    }
  }

  render() {
    return (
      <Text>Chimistries</Text>
    )
  }
}