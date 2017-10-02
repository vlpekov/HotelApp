import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

const BookButton = ({ onPress }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                Book now!
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#67a0cb',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#456dab',
        marginLeft: 5,
        marginRight: 5,
    }
};

export default BookButton;