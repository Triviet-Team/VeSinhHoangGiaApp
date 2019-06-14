import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ServiceListItem from "./../ServiceListItem";

export default class ServicesHomepage extends React.Component {
  render() {
    const { navigation, services } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLarge}>Dịch vụ nổi bật</Text>
          <TouchableOpacity
            style={styles.titleSmall}
            onPress={() => navigation.navigate("Services")}
          >
            <Text style={{ color: "#377ECC", marginRight: 5 }}>
              Tất cả dịch vụ
            </Text>
            <Icon name="arrow-right" size={18} color="#377ECC" />
          </TouchableOpacity>
        </View>
        {services !== null && services.length > 0 && (
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <View style={styles.wrapper}>
                <ServiceListItem
                  service={item}
                  onPress={() =>
                    navigation.navigate("ServiceDetail", {
                      serviceName: item.vn_name,
                      serviceImage: item.image_link,
                      serviceDesc: item.vn_detail
                    })
                  }
                />
              </View>
            )}
            keyExtractor={item => `${item.id}`}
          />
        )}
        <TouchableOpacity
          style={styles.titleAll}
          onPress={() => navigation.navigate("Services")}
        >
          <Text style={styles.titleAllText}>Xem tất cả sản phẩm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20
  },
  wrapper: {
    paddingHorizontal: 7.5
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: "500"
  },
  titleSmall: {
    marginTop: 5,
    flexDirection: "row"
  },
  titleAll: {
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 5
  },
  titleAllText: {
    backgroundColor: "#377ECC",
    paddingVertical: 12,
    paddingHorizontal: 30,
    color: "#fff",
    width: 250,
    textAlign: "center",
    fontSize: 16,
    borderRadius: 5
  }
});
