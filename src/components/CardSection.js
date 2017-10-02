import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
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
        backgroundColor: '#e1efff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e8f4fd',
        position: 'relative'
    }
};

export default CardSection;