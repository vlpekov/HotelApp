import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Spinner from 'rn-spinner';
import { ConfirmDialog } from 'react-native-simple-dialogs';


import Card from './Card';
import CardSection from './CardSection';
import CardSectionHeader from './CardSectionHeader';
import CardSectionCentered from './CardSectionCentered';
import FinilizeBooking from './FinalizeBooking';

class BookHotel extends Component {

    constructor(props) {
        console.log("################################## Booking ##################################");
        console.log("-------------------- constructor ----------------------");
        super(props);
        this.state = {
            currentDate: new Date(),
            checkInDate: new Date(),
            checkOutDate: new Date(),
            personsNumber: '1',
        };
        console.log("-------------------- states: ----------------------");
        console.log("constructor currentDate: " + this.state.currentDate);
        console.log("constructor checkInDate: " + this.state.checkInDate);
        console.log("constructor checkOutDate: " + this.state.checkOutDate);
    }
    componentWillMount() {
        this.changeCheckOutDate()
    }
    daysBetweenDates() {
        console.log("-------------------------------daysBetweenDates--------------------------------- ");
        console.log("checkInDate after change: " + this.state.checkInDate);
        console.log("checkOutDate after change: " + this.state.checkOutDate);
        var oneDayMilliseconds = 1000 * 60 * 60 * 24;
        var dateDifferenceMilliseconds = Math.abs(Date.parse(this.state.checkOutDate) - Date.parse(this.state.checkInDate));
        console.log("checkOutDate Date.parse: " + Date.parse(this.state.checkOutDate));
        console.log("checkInDate Date.parse: " + Date.parse(this.state.checkInDate));
        console.log("Days after change: " + dateDifferenceMilliseconds / oneDayMilliseconds);
        return Math.ceil(dateDifferenceMilliseconds / oneDayMilliseconds);
    }
    minCheckOutDate() {
        console.log("-------------------------------minCheckOutDate--------------------------------- ");
        console.log("checkInDate date in Milliseconds: " + Date.parse(this.state.checkInDate));
        var millisecondsInDay = 1000 * 60 * 60 * 24;
        var minCheckOutDate = new Date(millisecondsInDay + Date.parse(this.state.checkInDate));
        console.log("Min check out date minCheckOutDate: " + minCheckOutDate);
        return minCheckOutDate;
    }
    changeCheckOutDate() {
        console.log("-------------------------------changeCheckOutDate--------------------------------- ");
        if (this.state.checkOutDate <= this.state.checkInDate) {
            this.setState({ checkOutDate: this.minCheckOutDate() });
        }
    }
    getTotalPrice() {
        console.log("-------------------------------getTotalPrice--------------------------------- ");
        return this.daysBetweenDates() * this.props.price * this.state.personsNumber;
    }
    openConfirm(show) {
        this.setState({ showConfirm: show })
    }
    optionYes() {
        this.openConfirm(false);
        setTimeout(() => Alert.alert(
            'Booking completed',
            'You just complete your payment!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          ), 100)
    }

    optionNo() {
        this.openConfirm(false);
    }

    render() {
        console.log("-----------------********----render()----********--------------------- ");
        console.log("Persons: " + this.state.personsNumber);
        return (
            <Card>
                <CardSectionHeader>
                    <Text style={styles.headerTextStyle}>{this.props.hotel.name}</Text>
                </CardSectionHeader>
                <CardSectionCentered>
                    <Text style={styles.textStyle}>Price per night: {this.props.price} € (per person)</Text>
                </CardSectionCentered>
                <CardSection><Text style={styles.textDateNameStyle}>Check-in</Text>
                    <DatePicker
                        style={{
                            width: 250,
                            marginLeft: 20,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            alignSelf: 'flex-end',
                            flex: (1)
                        }}
                        date={this.state.checkInDate}
                        mode="date"
                        minDate={new Date()}
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 10
                            },
                            dateInput: {
                                backgroundColor: '#ffffff',
                                marginRight: 15,

                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({ checkInDate: date }),
                                this.changeCheckOutDate()
                        }}
                    />
                </CardSection>
                <CardSection><Text style={styles.textDateNameStyle}>Check-out</Text>
                    <DatePicker
                        style={{
                            width: 250,
                            marginLeft: 20,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            alignSelf: 'flex-end',
                            flex: (1)
                        }}
                        date={this.state.checkOutDate}
                        mode="date"
                        minDate={this.minCheckOutDate()}
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 10,

                            },
                            dateInput: {
                                marginRight: 15,
                                backgroundColor: '#ffffff',
                            }
                        }}
                        onDateChange={(date) => { this.setState({ checkOutDate: date }) }}
                    />
                </CardSection>
                <CardSectionCentered >
                    <Text style={styles.textStyle}>Total Days: {this.daysBetweenDates()}</Text>
                </CardSectionCentered>
                <CardSectionCentered><Text style={styles.spinnerTextStyle}>Persons:</Text>
                    <Spinner
                        max={100}
                        min={1}
                        default={1}
                        color='#9a73ef'
                        numColor='#9a73ef'
                        fontSize={16}
                        onNumChange={(num) => this.setState({ personsNumber: num })} />
                </CardSectionCentered>
                <CardSectionCentered>
                    <Text style={styles.textTotalPriceStyle}>Total Price: {this.getTotalPrice()}</Text>
                </CardSectionCentered>
                <Button onPress={() => this.openConfirm(true)} title="Confirm Booking" />
                <CardSection>
                
                    <ConfirmDialog
                        title="Confirm Payment"
                        message={'Payment of ' + this.getTotalPrice() + '€ is now required to complete the booking.'}
                        visible={this.state.showConfirm}
                        onTouchOutside={() => this.openConfirm(false)}
                        positiveButton={{
                            title: "YES",
                            onPress: () => this.optionYes()
                        }}
                        negativeButton={{
                            title: "NO",
                            onPress: () => this.optionNo()
                        }}
                    />
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        paddingTop: 10,
        textAlignVertical: 'center',
    },
    headerTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlignVertical: 'center',

    },
    textTotalPriceStyle: {
        fontSize: 22,
        paddingTop: 20,
        textAlignVertical: 'center',
    },
    textDateNameStyle: {
        fontSize: 18,
        width: 85,
        textAlign: 'right',
        textAlignVertical: 'center',
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
    spinnerTextStyle: {
        fontSize: 18,
        width: 85,
    },
});

export default BookHotel;