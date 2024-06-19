import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Profile({ dailies }) {


    return (
        <View>
            <Text>Nombres de jours sur Lumos : {dailies.length}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        objectFit: 'cover',
    },
})