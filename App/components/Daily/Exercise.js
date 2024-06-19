import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
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
            Thematics.thematics[daily.thematic].dayExercises.forEach(ex => {
                if (ex.title == daily.dayExercise) {
                    setExercise(ex);
                }
            });
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
            //source={background}
            style={styles.container}>
            <Text style={styles.title}>Votre exercice du jour</Text>
            <Text style={styles.exercise}>{exercise.title}</Text>
            <Text style={styles.advice}>{exercise.objective}</Text>
            {
                exercise.steps && exercise.steps.length > 0 &&
                <View style={styles.exercise}>
                    {
                        exercise.steps.map((step, index) => {
                            return (
                                <Text
                                    key={index}
                                    style={styles.steps}
                                >
                                    <AntDesign name="check" size={20} color="white" />
                                    {step}
                                </Text>
                            )
                        })
                    }
                </View>
            }

            <Text style={styles.advice}>
                {"Essayer d'appliquer cet exercice tout au long de la journée."}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setDaily({ ...daily, dayExercise: exercise.title });
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
    steps: {
        color: 'white',
        textAlign: 'left',
        padding: 5
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
    goals: {
        fontSize: 16,
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