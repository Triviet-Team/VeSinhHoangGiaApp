import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ImageBackground  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function AboutusHomepage(props) {
  const { aboutus, navigation } = props;

  return (
    <ImageBackground source={require('./../../assets/images/bg-aboutus.png')} style={styles.container}>
      {
        aboutus && 
        <View>
          <Text style={styles.title}>
          { aboutus.m_aboutus_name }
          </Text>

            <Text style={styles.description}>
              { aboutus.m_aboutus_desc }
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity 
                style={[
                  styles.button, 
                  { backgroundColor: '#377ECC', marginRight: 15, }
                ]}
              >
                <Icon name="phone" size={14} color="#fff" />
                <Text 
                  style={styles.text} 
                  onPress={ () => Linking.openURL(`tel:${aboutus.hotline}`)}
                >
                  { aboutus.hotline }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon name="plus" size={14} color="#377ECC" />
                <Text 
                  style={[styles.text, { color: '#377ECC' }]} 
                  onPress={() => navigation.navigate('Contact')}
                >
                  Xem thêm
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      }
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    lineHeight: 30,
    color: '#fff'
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#ccc',
    textAlign: 'justify'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#377ECC',
    borderRadius: 5,
  },
  text: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
});