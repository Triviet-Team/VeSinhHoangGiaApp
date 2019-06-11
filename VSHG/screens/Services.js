import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import callApi from './../callApi';
import Header from './../components/Header';
import ServiceListItem from './../components/ServiceListItem';

export default class Services extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header titleScreen="Dịch vụ vệ sinh"  onPress={() => navigation.navigate('Search')} />,
      headerStyle: { backgroundColor: '#377ECC' },
      headerTintColor: 'white',
      headerBackTitleStyle: { display: 'none' }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      services: [],
      spinner: false
    }
  }

  componentDidMount() {
    this.setState({ spinner: true });

    callApi('service/allservice', 'GET', null).then(res => {
      const servicePublic = res.data
        .filter(service => service.status === '1')
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        spinner: false,
        services: servicePublic
      })
    })
  }

  render() {
    const { navigation } = this.props;
    const { services } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />
        {
          (services !== null && services.length > 0)
          ? <FlatList 
            style={styles.scrollView}
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
          : <View style={styles.empty}>
              <Text style={styles.emptyText}>Chưa có dịch vụ nào trong mục</Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  scrollView: {
    paddingHorizontal: 7.5,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  empty: {
    padding: 15,
  },
  emptyText: {
    fontSize: 16,
  }
});
