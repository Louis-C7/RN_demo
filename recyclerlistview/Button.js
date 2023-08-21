import { Text, StyleSheet, Pressable, TouchableHighlight } from 'react-native'
import React from 'react'

export default function Button(props) {
    const { onPress, title='Save' } = props
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 12,
        // paddingHorizontal: 10,
        borderRadius: 4,
        // elevation: 3,
        backgroundColor: 'blue',
        width: 100,
        height: 50,
    },
    text: {
        fontSize: 16,
        // lineHeight: 21,
        fontWeight: 'bold',
        // letterSpacing: 0.25,
        color: 'white',
        width:100,
        height:50
    },
});