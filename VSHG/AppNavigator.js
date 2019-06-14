import React from "react";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Homepage from "./screens/Homepage";
import AllProducts from "./screens/AllProducts";

import Chemistries from "./screens/Chemistries";
import Contact from "./screens/Contact";

import Categories from "./screens/Categories";
import Products from "./screens/Products";
import ProductDetail from "./screens/ProductDetail.js";

import Services from "./screens/Services";
import ServiceDetail from "./screens/ServiceDetail";

import Search from "./screens/Search";

const HomepageStack = createStackNavigator({
  Homepage,
  ProductDetail,
  ServiceDetail,
  Products,
  AllProducts,
  Search
});
HomepageStack.navigationOptions = {
  tabBarLabel: "Trang chủ",
  tabBarIcon: ({ focused }) => {
    return (
      <MDIcon
        name={focused ? "home" : "home-outline"}
        size={24}
        color={focused ? "#377ECC" : "gray"}
      />
    );
  }
};

const ProductsStack = createStackNavigator({
  Categories,
  Products,
  ProductDetail,
  Search
});
ProductsStack.navigationOptions = {
  tabBarLabel: "Danh mục",
  tabBarIcon: ({ focused }) => {
    return (
      <MDIcon
        name={focused ? "ballot" : "ballot-outline"}
        size={24}
        color={focused ? "#377ECC" : "gray"}
      />
    );
  }
};

const ServicesStack = createStackNavigator({
  Services,
  ServiceDetail,
  Search
});
ServicesStack.navigationOptions = {
  tabBarLabel: "Dịch vụ",
  tabBarIcon: ({ focused }) => {
    return (
      <MDIcon
        name={focused ? "toolbox" : "toolbox-outline"}
        size={24}
        color={focused ? "#377ECC" : "gray"}
      />
    );
  }
};

const ChemistriesStack = createStackNavigator({
  Chemistries,
  ProductDetail,
  Search
});
ChemistriesStack.navigationOptions = {
  tabBarLabel: "Hóa chất",
  tabBarIcon: ({ focused }) => {
    return (
      <MDIcon
        name={focused ? "beaker" : "beaker-outline"}
        size={24}
        color={focused ? "#377ECC" : "gray"}
      />
    );
  }
};

const ContactStack = createStackNavigator({
  Contact,
  Search
});
ContactStack.navigationOptions = {
  tabBarLabel: "Liên hệ",
  tabBarIcon: ({ focused }) => {
    return (
      <MDIcon
        name={focused ? "mailbox-up" : "mailbox-up-outline"}
        size={24}
        color={focused ? "#377ECC" : "gray"}
      />
    );
  }
};

const AppNavigator = createMaterialTopTabNavigator(
  {
    HomepageStack,
    ProductsStack,
    ServicesStack,
    ChemistriesStack,
    ContactStack
  },
  {
    initialRouteName: "HomepageStack",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#377ECC",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fff",
        padding: 0
      },
      labelStyle: {
        textAlign: "center",
        fontSize: 10,
        marginBottom: -3,
        marginHorizontal: -10
      },
      showIcon: true,
      upperCaseLabel: false,
      indicatorStyle: {
        opacity: 0
      },
      iconStyle: {
        marginVertical: -5
      }
    }
  }
);

export default AppNavigator;
