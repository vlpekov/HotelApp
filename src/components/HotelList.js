import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import axios from 'axios';
import HotelDetail from './HotelDetail';


class HotelList extends Component {
    state = { hotels: [] };

    componentWillMount() {
        console.log('componentWillMount in AlbumList');
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=hotel&key=AIzaSyAiMvTNfhqREASAEsQogUcrh4nQcddtHXo')
            .then(response => this.setState({ hotels: response.data.results }));
    }

    /*     renderHotels() {
            return this.state.hotels.map(hotel =>
                <HotelDetail key={hotel.id} hotel={hotel} />
            );
        } */

    render() {
        console.log(this.state);
        const { textStyle, viewStyle } = styles;
        return (
            <View>
                {/* {this.renderHotels()} */}
                <FlatList
                    data={this.state.hotels}
                    renderItem={({ item }) => <HotelDetail hotel={item} />}
                    keyExtractor={item => item.id}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default HotelList;