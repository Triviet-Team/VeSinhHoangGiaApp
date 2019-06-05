import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Homepage from './screens/Homepage';
import Chemistries from './screens/Chemistries';
import Products from './screens/Products';
import ProductDetail from './screens/ProductDetail.js';
import Services from './screens/Services';

const HomepageStack = createStackNavigator({
  Homepage
});
HomepageStack.navigationOptions = {
  tabBarLabel: 'Trang chủ',
  tabBarIcon: ({ focused }) => {
    return <Icon name="ios-home" size={24} color={ focused ? '#377ECC' : 'gray' } />
  },
  tabBarOptions: {
    activeTintColor: '#377ECC',
    inactiveTintColor: 'gray'
  }
}

const ProductsStack = createStackNavigator({
  Products,
  ProductDetail
});
ProductsStack.navigationOptions = {
  tabBarLabel: 'Danh mục',
  tabBarIcon: ({ focused }) => {
    return <Icon name="md-cube" size={24} color={ focused ? '#377ECC' : 'gray' } />
  },
  tabBarOptions: {
    activeTintColor: '#377ECC',
    inactiveTintColor: 'gray'
  }
}

const ServicesStack = createStackNavigator({
  Services
});
ServicesStack.navigationOptions = {
  tabBarLabel: 'Dịch vụ',
  tabBarIcon: ({ focused }) => {
    return <Icon name="ios-people" size={24} color={ focused ? '#377ECC' : 'gray' } />
  },
  tabBarOptions: {
    activeTintColor: '#377ECC',
    inactiveTintColor: 'gray'
  }
}

const ChemistriesStack = createStackNavigator({
  Chemistries
});
ChemistriesStack.navigationOptions = {
  tabBarLabel: 'Hóa chất',
  tabBarIcon: ({ focused }) => {
    return <Icon name="ios-flask" size={24} color={ focused ? '#377ECC' : 'gray' } />
  },
  tabBarOptions: {
    activeTintColor: '#377ECC',
    inactiveTintColor: 'gray'
  }
}

const AppNavigator = createBottomTabNavigator({
  ProductsStack,
  HomepageStack,
  ServicesStack,
  ChemistriesStack
});

export default AppNavigator;
