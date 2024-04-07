import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Thematics from '../../shared/Thematics';
import { AntDesign } from '@expo/vector-icons';

export default function NightExercise({ daily, setDaily, background }) {

    const [exercise, setExercise] = useState('');
    const [showExercise, setShowExercise] = useState(false);

    const getExercise = () => {
        if (!daily) return;
        if (exercise !== '') return;

        let _exercise = '';


        if (daily.nightExercise && daily.nightExercise !== '') {
            setExercise(daily.nightExercise);
        }
        else {
            _exercise = Thematics.thematics[daily.thematic].nightExercises[Math.floor(Math.random() * Thematics.thematics[daily.thematic].nightExercises.length)];
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
            {
                showExercise ? (
                    <>
                        <Text style={styles.title}>Votre exercice du soir</Text>
                        <Text></Text>
                        <Text style={styles.exercise}>{exercise}</Text>
                        <Text style={styles.advice}>
                            {"Essayer d'y réflechir le plus objectivement possible sans vous juger."}
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setDaily({ ...daily, nightExercise: exercise });
                            }}
                        >
                            <Text style={styles.continue}>Continuer</Text>
                        </TouchableOpacity>
                    </>
                ) :
                    (
                        <>
                            <Text style={styles.title}>Exercice du soir</Text>
                            <Text style={styles.advice}>Attendez le soir pour découvrir votre exercice du soir.</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setShowExercise(true)}
                            >
                                <Text style={styles.continue}>Découvrir</Text>
                            </TouchableOpacity>


                        </>
                    )
            }

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