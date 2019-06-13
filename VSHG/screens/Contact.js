import React from "react";
import { Text, View, StyleSheet, ScrollView, Linking } from "react-native";
import HTML from "react-native-render-html";

import Spinner from 'react-native-loading-spinner-overlay';

import callApi from "./../callApi";
import Header from "../components/Header";
import DetailContactButton from './../components/DetailContactButton';

export default class Contact extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header 
        titleScreen="Thông tin liên hệ" 
        onPress={() => navigation.navigate('Search')}  
      />,
      headerStyle: { backgroundColor: "#377ECC", height: 60 },
      headerBackTitleStyle: { display: "none" }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      aboutus: 'Chưa có dữ liệu',
      isActiveContactButton: false,
      spinner: false,
      contact: {}
    };
  }

  componentDidMount() {
    this.setState({ spinner: true })
    this.fetchAboutusScreen();
    this.onFetchContact();
  }

  fetchAboutusScreen = () => {
    callApi("staticpage/allpage", "GET", null).then(res => {
      const aboutusPage = res.data
        .filter(page => {
          return page.id === "1";
        })
        .map(page => page.vn_detail);

      this.setState({
        aboutus: aboutusPage,
        spinner: false,
      });
    });
  };

  onFetchContact = () => {
    callApi('config', 'GET', null).then(res => {
      const contactJsonMode = JSON.parse(res.data);

      this.setState({
        contact: contactJsonMode,
      })
    })
  }

  render() {
    const { contact, spinner, isActiveContactButton, aboutus } = this.state;
    
    return (
      <View>
        <Spinner
          visible={spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        <ScrollView style={styles.container}>
          <HTML html={`${aboutus}`} />
        </ScrollView>
        <DetailContactButton 
          isActiveContactButton={isActiveContactButton} 
          contact={contact} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
