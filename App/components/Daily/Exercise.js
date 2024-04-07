import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Thematics from '../../shared/Thematics';
import { AntDesign } from '@expo/vector-icons';

export default function Exercise({ daily, setDaily, background }) {

    const [exercise, setExercise] = useState('');

    const getExercise = () => {
        if (!daily) return;
        if (exercise !== '') return;

        let _exercise = '';


        if (daily.dayExercise && daily.dayExercise !== '') {
            setExercise(daily.dayExercise);
        }
        else {
            _exercise = Thematics.thematics[daily.thematic].dayExercises[Math.floor(Math.random() * Thematics.thematics[daily.thematic].dayExercises.length)];
            setExercise(_exercise);
        }


    }

    useEffect(() => {
        getExercise();
    }, [daily]);

    return background && (
        <ImageBackground
            source={background}
            style={styles.container}>
            <Text style={styles.title}>Votre exercice du jour</Text>
            <Text></Text>
            <Text style={styles.exercise}>{exercise}</Text>
            <Text style={styles.advice}>
                {"Essayer d'appliquer cet exercice tout au long de la journée."}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setDaily({ ...daily, dayExercise: exercise });
                }}
            >
                <Text style={styles.continue}>Continuer</Text>
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
        width: '100%',
        objectFit: 'cover',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        marginTop: 50,
    },
    exercise: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        padding: 30,
        width: ScreenWidth,
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