import React from 'react';
import { View } from 'react-native';

const CardSectionHeader = (props) => {
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
        backgroundColor: '#7b9bc1',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#e8f4fd',
        height: 50,
    }
};

export default CardSectionHeader;