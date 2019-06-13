import React from 'react';
import { ScrollView, Text, Image, StyleSheet, View, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import callApi from "./../callApi";

import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default class ProductDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header 
        titleScreen="Chi tiết dịch vụ"  
        onPress={() => navigation.navigate('Search')} 
      />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerTintColor: 'white',
      headerBackTitleStyle: { display: 'none' }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isActiveContactButton: false,
      contact: {}
    }
  }

  componentDidMount() {
    this.onFetchContact();
  }

  onFetchContact = () => {
    callApi('config', 'GET', null).then(res => {
      const contactJsonMode = JSON.parse(res.data);

      this.setState({
        contact: contactJsonMode,
      })
    })
  }

  render() {
    const { navigation } = this.props;
    const { contact, isActiveContactButton } = this.state;
    const name = navigation.getParam('serviceName')
    const image = navigation.getParam('serviceImage')
    const description = navigation.getParam('serviceDesc');
    const imgDirUrl = 'https://vesinhcongnghiep.com.vn/uploads/images/news/350_350';

    return (
      <View>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <Text style={styles.name}>{ name }</Text>
                <Image style={styles.img} source={{ uri: `${imgDirUrl}/${image}` }} />
            </View>

            <View style={styles.description}>
              <HTML html={description} imagesMaxWidth={width - 30} />
            </View>
          </View>
        </ScrollView>
        <DetailContactButton 
          isActiveContactButton={isActiveContactButton} 
          contact={contact} 
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f9f9f9'
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  imgBox: {
    flex: 1,
  },
  img: {
    height: 300,
    flex: 1,
    width: null,
    marginBottom: 15,
  },
  description: {
    padding: 15,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  descriptionTitle: {
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    fontSize: 20,
    fontWeight: '500',
  }
})