import React from "react";
import { Text, View, StyleSheet, ScrollView, Linking } from "react-native";
import { Fab, Button } from "native-base";
import HTML from "react-native-render-html";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from 'react-native-loading-spinner-overlay';

import callApi from "./../callApi";
import Header from "../components/Header";

export default class Contact extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header titleScreen="Thông tin liên hệ" />,
      headerStyle: { backgroundColor: "#377ECC" },
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
        <Fab
          active={isActiveContactButton}
          direction="up"
          containerStyle={{ position: "absolute", bottom: 10, right: 10 }}
          style={{ backgroundColor: "#34A34F" }}
          position="bottomRight"
          onPress={() => this.setState({ isActiveContactButton: !isActiveContactButton })}
        >
          <Icon name="headphones" size={40} />
          <Button 
            style={{ backgroundColor: "#DD5144" }}
            onPress={ () => Linking.openURL(`tel:${contact.m_phone}`)}
          >
            <Icon name="phone" size={20} color="#fff" />
          </Button>
          <Button 
            style={{ backgroundColor: "#00AFF0" }}
            onPress={ () => Linking.openURL(`skype:${contact.m_skype}?call`)}
            >
            <Icon name="skype" size={20} color="#fff" />
          </Button>
          <Button 
            style={{ backgroundColor: "#0084ff" }}
            onPress={ () => Linking.openURL(`http://zalo.me/${contact.m_zalo}`)}
          >
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '700' }}>Z</Text>
          </Button>
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 0,
    backgroundColor: "#fff"
  },
  textContact: {
    position: 'absolute', 
    right: 45, 
    width: 100,
    textAlign: 'center',
    lineHeight: 40,
    height: 40,
    borderRadius: 20,
    color: '#fff'
  }
});
