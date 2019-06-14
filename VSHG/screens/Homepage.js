import React from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  SafeAreaView
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import callApi from "./../callApi";

import Header from "./../components/Header";
import Banner from "./../components/Homepage/Banner";
import AboutusHomepage from "./../components/Homepage/AboutusHomepage";
import ServicesHomepage from "./../components/Homepage/ServicesHomepage";
import CategoriesHomepage from "./../components/Homepage/CategoriesHomepage";
import ProductsHomepage from "./../components/Homepage/ProductsHomepage";

export default class Homepage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
              justifyContent: "space-between",
              alignItems: "center",
              height: 50
            }}
          >
            <ScrollView horizontal>
              <Text
                numberOfLines={1}
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  paddingRight: 10,
                  flex: 1,
                  alignItems: "flex-end"
                }}
              >
                CTY TNHH ĐT TM DV HOÀNG GIA
              </Text>
            </ScrollView>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              0939 38 39 39
            </Text>
          </View>
          <Header
            titleScreen="Trang chủ"
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      ),
      headerStyle: { backgroundColor: "#377ECC", height: 110 },
      headerTintColor: "white",
      headerBackTitleStyle: { display: "none" }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      banners: [],
      categories: [],
      services: [],
      products: [],
      contact: {},
      spinner: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.setState({ spinner: true });
    this.onFetchBanner();
    this.onFetchAboutus();
    this.onFetchCategories();
    this.onFetchServices();
    this.onFetchProducts();
  }

  onFetchBanner = () => {
    this.setState({ spinner: true });

    callApi("ads/allads", "GET", null).then(res => {
      const bannersPublic = res.data
        .filter(banner => banner.status === "1" && banner.cid === "6")
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        banners: bannersPublic,
        spinner: false,
        refreshing: false
      });
    });
  };

  onFetchAboutus = () => {
    callApi("config", "GET", null).then(res => {
      const aboutusJsonMode = JSON.parse(res.data);
      this.setState({
        aboutus: aboutusJsonMode
      });
    });
  };

  onFetchCategories = () => {
    this.setState({ spinner: true });

    callApi("product/category", "GET", null).then(res => {
      const categoriesHomepage = res.data
        .filter(cate => cate.status === "1" && cate.pid === "173")
        .sort((a, b) => parseInt(b.position) - parseInt(a.position));

      this.setState({
        categories: categoriesHomepage,
        spinner: false,
        refreshing: false
      });
    });
  };

  onFetchServices = () => {
    callApi("service/allservice", "GET", null).then(res => {
      const serviceFeature = res.data
        .filter(service => service.home === "1")
        .splice(0, 6)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        services: serviceFeature,
        spinner: false,
        refreshing: false
      });
    });
  };

  onFetchProducts = () => {
    this.setState({ spinner: true });

    callApi("product/allproduct", "GET", null).then(res => {
      const data = res.data
        .filter(product => product.is_home === "1" && product.cid !== "180")
        .splice(0, 10)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        products: data,
        spinner: false,
        refreshing: false
      });
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.onFetchCategories();
    this.onFetchServices();
    this.onFetchProducts();
    this.onFetchBanner();
  };

  render() {
    const {
      banners,
      aboutus,
      categories,
      services,
      products,
      refreshing,
      spinner
    } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Spinner
            visible={spinner}
            textContent={"Đang tải..."}
            textStyle={{ color: "#fff" }}
          />
          <Banner banners={banners} />
          <AboutusHomepage navigation={navigation} aboutus={aboutus} />
          <CategoriesHomepage navigation={navigation} categories={categories} />
          <ServicesHomepage navigation={navigation} services={services} />
          <ProductsHomepage navigation={navigation} products={products} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9"
  }
});
