import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { Actions } from 'react-native-router-flux';

class HotelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { photoUri: this.props.hotel.icon };
  }
  getPhotoUri() {
    if (this.props.hotel.photos && this.props.hotel.photos.length > 0) {
      this.photoUri = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + this.props.hotel.photos[0].photo_reference + "&key=AIzaSyAiMvTNfhqREASAEsQogUcrh4nQcddtHXo";
      { console.log(this.photoUri) }
    }
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => Actions.hotelInfo({ hotel: this.props.hotel })}>
          <CardSection>
            <View style={styles.imageContainerStyle}>
              {this.getPhotoUri()}
              <Image
                style={styles.imageStyle}
                source={{ uri: this.photoUri }}
              />
            </View>
            <View style={styles.headerHotelCellStyle}>
              <Text style={styles.hotelNameTextStyle}>{this.props.hotel.name}</Text>
              <Text>Rating: {this.props.hotel.rating} </Text>
            </View>
          </CardSection>
        </TouchableOpacity>
      </Card>
    );
  };
}


const styles = StyleSheet.create({
  headerHotelCellStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: 70,
    width: 70
  }, imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  hotelNameTextStyle: {
    fontSize: 18
  }

});

export default HotelDetail;
