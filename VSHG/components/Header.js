import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function Header(props) {
  const { titleScreen, onPress } = props;

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        style={ Platform.OS === "ios" ? styles.titleIOS : styles.titleAndr }
      >
        {titleScreen}
      </Text>
      <TouchableOpacity
        style={ Platform.OS === "ios" ? styles.searchBtnIOS : styles.searchBtnAndr }
        onPress={onPress}
      >
        <Icon name="ios-search" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    flex: 1,
    width: width,
    overflow: "hidden",
    height: 60,
    borderTopColor: "#418cde",
    borderTopWidth: 1,
    alignItems: "center"
  },
  titleAndr: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff"
  },
  titleIOS: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    width: width - 45
  },
  searchBtnAndr: {
    position: "absolute",
    right: 15,
    top: 15
  },
  searchBtnIOS: {
    position: "relative",
    right: 15,
    top: 15,
    width: 30,
    alignItems: "flex-end"
  }
});
