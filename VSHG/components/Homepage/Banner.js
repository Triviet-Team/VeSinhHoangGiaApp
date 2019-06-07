import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { DeckSwiper, Card, CardItem, Button, Container, View } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function Banner(props) {
  const { banners } = props;

  return (

    <Container style={styles.banner}>
      <View>
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={banners}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem cardBody>
                <Image 
                  style={{ height: width / 2, flex: 1 }} 
                  source={{ uri: item.image }}  
                />
              </CardItem>
            </Card>
          }
        />
      </View>
      <View style={styles.bannerButton}>
      <Button style={styles.button} onPress={() => this._deckSwiper._root.swipeLeft()}>
        <Icon name="chevron-left" size={40} color="#fff" />
      </Button>
      <Button style={styles.button} onPress={() => this._deckSwiper._root.swipeRight()}>
        <Icon name="chevron-right" size={40} color="#fff" />
      </Button>
    </View>
    </Container>
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