import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import HotelList from './src/components/HotelList';
import HotelFullInfo from './src/components/HotelFullInfo';
import Header from './src/components/Header';
import BookHotel from './src/components/BookHotel';


class RouterComponent extends Component {
    render() {
        return (
            <Router sceneStyle={{ paddingTop: 50, paddingBottom: 20 }} >
                <Scene key="list" component={HotelList} title="Hotel List" initial/>
                <Scene key="hotelInfo" component={HotelFullInfo} title="Hotel Info"/>
                <Scene key="bookHotel" component={BookHotel} title="Booking..."/>
             </Router>

        );
    }
}

export default RouterComponent;