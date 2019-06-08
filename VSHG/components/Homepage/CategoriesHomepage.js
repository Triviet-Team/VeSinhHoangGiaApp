import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import CategoryListItem from './../CategoryListItem';

export default class CategoriesHomepage extends React.Component {

  render() {
    const { navigation, categories } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLarge}>Danh mục sản phẩm</Text>
          <TouchableOpacity
            style={styles.titleSmall}
            onPress={() => navigation.navigate('Categories')}
          >
            <Text style={{ color: '#377ECC', marginRight: 5 }}>
              Xem tất cả
            </Text>
            <Icon name="plus" size={18} color="#377ECC" />
          </TouchableOpacity>
        </View>
        {
          (categories !== null && categories.length > 0)
          && <FlatList 
              horizontal
              style={styles.scrollView}
              data={categories}
              initialNumToRender={4}
              renderItem={({ item }) => (
                <View style={styles.wrapper}>
                  <CategoryListItem 
                    category={item}
                    width={Dimensions.get('window').width / 2 - 50}
                    onPress={() => navigation.navigate('Products', {
                      categoryId: item.id,
                      categoryName: item.vn_name
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
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingBottom: 20,
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flexDirection: 'row'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: '500',
  },
  titleSmall: {
    marginTop: 5,
    flexDirection: 'row',
    
  }
});
