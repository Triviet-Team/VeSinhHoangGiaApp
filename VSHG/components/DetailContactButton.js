import React from 'react';
import { StyleSheet, Image, Dimensions, View, Text, Linking } from 'react-native';
import { Fab, Button } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



export default class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveContactButton: false
    }
  }
  render() {
    const { contact } = this.props;
    const { isActiveContactButton } = this.state;

    return (
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
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: '700' }}>
            Z
          </Text>
        </Button>
      </Fab>
    )
  }
}