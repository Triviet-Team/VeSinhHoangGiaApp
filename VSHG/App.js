import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import { AppLoading } from "expo";
import * as Font from 'expo-font'

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }

    return (
      <AppContainer />
    );
  }
}