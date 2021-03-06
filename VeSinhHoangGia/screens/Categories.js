import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import CategoryListItem from '../components/CategoryListItem';
import Header from './../components/Header';
import callApi from './../callApi';

export default class Categories extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header />,
      headerStyle: { backgroundColor: '#377ECC', height: 60 },
      headerBackTitle: 'Trở về'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      spinner: false,
      refreshing: false,
    }
  }

  
  componentDidMount() {
    this.setState({ spinner: true })

    this.fetchProduct();
  }

  fetchProduct = () => {
    callApi('product/category', 'GET', null).then(res => {
      const categoryPublic = res.data
        .filter(cate => {
          return cate.status === "1" && cate.pid === "173"
        })
        .sort((a, b) => parseInt(a.id) - parseInt(b.id));
      this.setState({
        categories: categoryPublic,
        spinner: false,
        refreshing: false,
      })
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchProduct();
  };
  

  render() {
    const { navigation } = this.props;
    const { categories } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={{ color: '#fff' }}
        />

        <FlatList 
          style={styles.scrollView}
          data={categories}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <CategoryListItem 
                category={item}
                onPress={() => navigation.navigate('Products', {
                  categoryId: item.id,
                  categoryName: item.vn_name
                })}
              />
            </View>
          )}
          keyExtractor={item => `${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
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
  wrapper: {
    flex: 1,
  }
})