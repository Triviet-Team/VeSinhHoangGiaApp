import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import * as config from './../config';

export default function CategoryListItem(props) {
  const { category, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.box, { width: props.width }]}>
        <Image
          style={styles.img}
          source={{ uri: `${config.CATEGORY_DIR_NAME}/${category.image_link}` }}
        />
        <Text style={styles.name} numberOfLines={2}>
          {category.vn_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    margin: 7.5,
    borderRadius: 3,
    marginTop: 15
  },
  img: {
    flex: 1,
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    resizeMode: "cover"
  },
  name: {
    textAlign: "center",
    lineHeight: 20
  }
});
