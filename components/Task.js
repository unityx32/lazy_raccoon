import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Task = (props) => {

    return (
        <View style={styles.tarefa}>
            <View style={{ elevation: 5, backgroundColor: 'black' }}>
                <ImageBackground source={require('../assets/tronco.png')} resizeMode="cover" style={styles.backImage}>
                    <Text style={styles.text}>{props.text}</Text>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backImage: {
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'white',
    },

    tarefa: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },

    text: {
        fontSize: 20,
        fontWeight: '500'
    }
});

export default Task;