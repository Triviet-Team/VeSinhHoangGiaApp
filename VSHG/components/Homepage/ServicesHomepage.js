import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import callApi from './../../callApi';
import ServiceListItem from './../ServiceListItem';

export default class ServicesHomepage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      services: [],
    }
  }

  componentDidMount() {

    callApi('service/allservice', 'GET', null).then(res => {
      const serviceFeature = res.data
        .filter(service => service.home === '1')
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        services: serviceFeature
      })
    })
  }

  render() {
    const { navigation } = this.props;
    const { services } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLarge}>Dịch vụ nổi bật</Text>
          <TouchableOpacity style={styles.titleSmall}>
            <Text style={{ color: '#377ECC', marginRight: 5 }}>
              Xem tất cả
            </Text>
            <Icon name="plus" size={18} color="#377ECC" />
          </TouchableOpacity>
        </View>
        {
          (services !== null && services.length > 0)
          && <FlatList 
              data={services}
              renderItem={({ item }) => (
                <View style={styles.wrapper}>
                  <ServiceListItem 
                    service={item}
                    onPress={() => navigation.navigate('ServiceDetail', {
                      serviceName: item.vn_name,
                      serviceImage: item.image_link,
                      serviceDesc: item.vn_detail
                    })}
                  />
                </View>
              )}
              keyExtractor={item => `${item.id}`}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  wrapper: {
    paddingHorizontal: 7.5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleLarge: {
    fontSize: 24,
    fontWeight: '600',
  },
  titleSmall: {
    marginTop: 10,
    flexDirection: 'row'
  }
});
