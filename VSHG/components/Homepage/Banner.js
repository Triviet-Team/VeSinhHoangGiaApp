import React from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default function Banner(props) {
  const { banners } = props;

  return (

    <View style={styles.banner}>
      
      <Swiper 
        showsButtons={true}
        nextButton={ <Icon name="chevron-right" size={40} color="#377ECC" /> }
        prevButton={ <Icon name="chevron-left" size={40} color="#377ECC" /> }
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        showsPagination={false}
      >
        { banners.map(banner => {
          return <Image 
            key={banner.id}
            style={{ height: width / 2, flex: 1 }} 
            source={{ uri: `https://vesinhcongnghiep.com.vn/uploads/images/ads/${banner.image_link}` }}  
          />
        })}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: 20,
    height: width / 2,
    flex: 1,
  },
  bannerButton: { 
    flexDirection: "row", 
    flex: 1, 
    position: "absolute", 
    top: width / 6 - 10, 
    left: 0, 
    right: 0, 
    justifyContent: 'space-between', 
    padding: 15 
  },
  button: {
    backgroundColor: 'transparent',
    elevation: 0
  },
});