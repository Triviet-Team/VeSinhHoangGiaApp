import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';

import Header from './../components/Header';
import Banner from './../components/Homepage/Banner';
import ServiceHomepage from './../components/Homepage/ServicesHomepage';

const cards = [
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/78c2d756dfe154d18e6c8b2c5d503cbe/5D8F792E/t51.2885-15/sh0.08/e35/p640x640/60281421_2319158248131071_2993096072439239636_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/1c2cd96e9e5ff9192efc0e3a534e6ba2/5D8DD6C0/t51.2885-15/sh0.08/e35/p640x640/60114620_335883707122529_3423228155080954832_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
  {
    image: 'https://scontent-hkg3-1.cdninstagram.com/vp/898ab36b8c29045aa5c5333495a23a17/5D8CB6A8/t51.2885-15/sh0.08/e35/s640x640/54511124_828195200864914_2233949510347612166_n.jpg?_nc_ht=scontent-hkg3-1.cdninstagram.com',
  },
];

export default class Homepage extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header titleScreen="Vệ sinh Hoàng Gia"/>,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerBackTitleStyle: { display: 'none' }
    }
  }
  
  constructor(props) {
    super(props);

    this.state = {
      banners: cards
    }
  }

  render() {
    const { banners } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Banner banners={banners} />
        <ServiceHomepage />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9'
  }
})