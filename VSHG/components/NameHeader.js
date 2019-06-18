import React from "react";
import { View, Text } from "react-native";

import callApi from "./../callApi";

export default class NameHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutus: null
    };
  }

  componentDidMount() {
    this.onFetchAboutus();
  }

  onFetchAboutus = () => {
    callApi("config", "GET", null).then(res => {
      const aboutusJsonMode = JSON.parse(res.data);
      this.setState({
        aboutus: aboutusJsonMode
      });
    });
  };

  render() {
    const { aboutus } = this.state;

    return (
      aboutus !== null 
        ? <View style={{ paddingVertical: 15, height: 70, backgroundColor: "#377ECC" }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: 3
              }}
            >
              {aboutus.vn_keyword_site}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center"
              }}
            >
              Hotline: {aboutus.m_phone}
            </Text>
          </View>
      : <View></View>
    )
  }
}
