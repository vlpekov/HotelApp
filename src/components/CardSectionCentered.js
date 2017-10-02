import React from 'react';
import { View } from 'react-native';

const CardSectionCentered = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#e8f4fd',
        backgroundColor: '#e1efff',
        position: 'relative'
    }
};

export default CardSectionCentered;