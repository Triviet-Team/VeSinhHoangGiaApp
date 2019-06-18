import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import ProductListItem from "../components/ProductListItem";
import Header from "./../components/Header";
import callApi from "./../callApi";
import NameHeader from "../components/NameHeader";

export default class Chemistries extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Header
          titleScreen="Hóa chất"
          onPress={() => navigation.navigate("Search")}
        />
      ),
      headerStyle: { backgroundColor: "#377ECC", height: 60 },
      headerTintColor: "white",
      headerBackTitleStyle: { display: "none" }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      chemistries: [],
      spinner: false
    };
  }

  componentDidMount() {
    this.setState({ spinner: true });

    callApi("product/allproduct", "GET", null).then(res => {
      const data = res.data
        .filter(chemistry => {
          return chemistry.cid === "180" && chemistry.status === "1";
        })
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      this.setState({
        chemistries: data,
        spinner: false
      });
    });
  }

  render() {
    const { navigation } = this.props;
    const { chemistries } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={"Đang tải..."}
          textStyle={{ color: "#fff" }}
        />
        <ScrollView>
          <NameHeader />
          {chemistries !== null && chemistries.length > 0 ? (
            <FlatList
              style={styles.scrollView}
              data={chemistries}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.wrapper}>
                  <ProductListItem
                    product={item}
                    onPress={() =>
                      navigation.navigate("ProductDetail", {
                        productName: item.vn_name,
                        productImage: item.image_link,
                        productDesc: item.vn_detail
                      })
                    }
                  />
                </View>
              )}
              keyExtractor={item => `${item.id}`}
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                Chưa có sản phẩm nào trong mục
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#f9f9f9"
  },
  scrollView: {
    paddingHorizontal: 7.5
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  empty: {
    padding: 15
  },
  emptyText: {
    fontSize: 16
  }
});
