import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet } from 'react-native';
import AppNavigator from './AppNavigator';

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4'
  }
})