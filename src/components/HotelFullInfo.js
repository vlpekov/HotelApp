import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import DatePicker from "react-native-datepicker";
import Card from "./Card";
import CardSection from "./CardSection";
import CardSectionHeader from "./CardSectionHeader";
import BookButton from "./BookButton";
import Popup from "react-native-popup";
import { Actions } from "react-native-router-flux";

class HotelFullInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.setPrice(40, 75),
      checkInDate: new Date(),
      checkOutDate: new Date()
    };
  }

  getPhotoUri() {
    if (this.props.hotel.photos && this.props.hotel.photos.length > 0) {
      this.photoUri =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
        this.props.hotel.photos[0].photo_reference +
        "&key=AIzaSyAiMvTNfhqREASAEsQogUcrh4nQcddtHXo";
      {
        console.log(this.photoUri);
      }
    }
  }
  setPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getPrice() {
    return this.price;
  }

  render() {
    const { textStyle, viewStyle } = styles;
    return (
      <Card>
        <CardSectionHeader style={styles.headerContainer}>
          <Text style={styles.headerTextStyle}>{this.props.hotel.name}</Text>
        </CardSectionHeader>
        <CardSection>
          {this.getPhotoUri()}
          <Image style={styles.imageStyle} source={{ uri: this.photoUri }} />
        </CardSection>
        <CardSection>
          <View>
            <Text style={styles.textStyle}>
              Rating: <Text style={styles.bold}>{this.props.hotel.rating}</Text>
            </Text>
            <Text style={styles.textStyle}>
              Vicinity: Rating: {this.props.hotel.vicinity}
            </Text>
            <Text style={styles.textStyle}>
              Latitude: {this.props.hotel.geometry.location.lat}{" "}
            </Text>
            <Text style={styles.textStyle}>
              Longitude: {this.props.hotel.geometry.location.lng}
            </Text>
            <Text style={styles.textStyle}>
              Price per person per night:{" "}
              <Text style={styles.bold}>{this.state.price}</Text>
            </Text>
          </View>
        </CardSection>
        <CardSection>
          <BookButton
            onPress={() =>
              Actions.bookHotel({
                price: this.state.price,
                hotel: this.props.hotel
              })}
          />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 10
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    textAlignVertical: "center"
  },

  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  imageStyle: {
    flex: 1,
    height: 300,
    width: null,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#3a3a3a"
  }
});

export default HotelFullInfo;
