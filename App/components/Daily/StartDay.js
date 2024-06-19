import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

export default function StartDay({ background, setProgress }) {
    return background && (
        <ImageBackground
            //source={background}
            style={styles.container}>
            <Text style={styles.title}>Bienvenue !</Text>
            <Text style={styles.advice}>Cliquez sur le bouton ci-dessous pour découvrir votre mantra et exercice de la journée.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setProgress(0)}
            >
                <Text style={styles.continue}>Découvrir</Text>
            </TouchableOpacity>
        </ImageBackground>

    )
}

const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        objectFit: 'cover',
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        marginTop: 50,
    },
    advice: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, .6)',
        width: ScreenWidth - 40,
        padding: 20,
        borderRadius: 30,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
    continue: {
        color: 'white',
        fontSize: 20,
    },
})