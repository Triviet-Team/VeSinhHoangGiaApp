import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ImageBackground
} from "react-native";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AboutusHomepage(props) {
  const { aboutus, navigation } = props;

  return (
    <ImageBackground
      source={require("./../../assets/images/bg-aboutus.png")}
      style={styles.container}
    >
      {aboutus && (
        <View>
          <Text style={styles.title}>{aboutus.m_aboutus_name}</Text>

          <Text style={styles.description}>{aboutus.m_aboutus_desc}</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#377ECC", marginRight: 15 }
              ]}
              onPress={() => Linking.openURL(`tel:${aboutus.hotline}`)}
            >
              <MDIcon name="phone-in-talk" size={14} color="#fff" />
              <Text style={styles.text}>{aboutus.hotline}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Contact")}
            >
              <Text style={[styles.text, { color: "#377ECC", marginRight: 5 }]}>
                Xem thêm
              </Text>
              <MDIcon name="arrow-right" size={14} color="#377ECC" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    resizeMode: "cover"
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
    color: "#fff"
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#ccc",
    textAlign: "justify"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#377ECC",
    borderRadius: 5
  },
  text: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  }
});
