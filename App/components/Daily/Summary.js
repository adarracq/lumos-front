import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../shared/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function Summary({ daily, goTo, background }) {

    const getAverageScore = (questions) => {
        let total = 0;
        let nbQuestions = 0;
        questions.forEach(question => {
            if (question) {
                total += question
                nbQuestions++
            }
        })
        return Math.round((total / nbQuestions) * 10) / 10
    }

    const getFeelingsNote = (feelings) => {
        let total = 0;
        let nbFeelings = 0;
        feelings.forEach(feeling => {
            if (feeling.value) {
                total += feeling.value
                nbFeelings++
            }
        })
        return Math.round((total / nbFeelings) * 10) / 10
    }


    const getFeelings = (feelings) => {

        const _feelings = [
            { title: '😢', value: 1, categories: [], color: Colors.red, bckColor: Colors.lightRed },
            { title: '😔', value: 2, categories: [], color: Colors.blue, bckColor: Colors.lightBlue },
            { title: '😊', value: 4, categories: [], color: Colors.yellow, bckColor: Colors.lightYellow },
            { title: '😄', value: 5, categories: [], color: Colors.green, bckColor: Colors.lightGreen },
        ];

        feelings.forEach(feeling => {
            _feelings.forEach(_feeling => {
                if (feeling.value == _feeling.value && feeling.value != 3) {
                    _feeling.categories.push(feeling)
                }
            });
        });

        return (
            <View style={styles.feelingsContainer}>
                {
                    _feelings.map(feeling => {
                        return (
                            <View style={{
                                flex: 1,
                                backgroundColor: feeling.bckColor,
                                borderColor: feeling.color,
                                borderRadius: 10,
                                borderWidth: 1,
                                margin: 2,
                                paddingBottom: 10,
                            }}>
                                <Text style={{ fontSize: 25, textAlign: 'center' }}>{feeling.title}</Text>
                                {
                                    feeling.categories.map(_feeling => {
                                        return <MaterialIcons
                                            name={_feeling.icon}
                                            size={24}
                                            color={feeling.color}
                                            style={{ textAlign: 'center' }}
                                        />
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    const getDiaries = (diaries) => {

        return (
            <View style={{ width: '100%' }} >
                {
                    diaries.map(diary => {
                        return (
                            <View style={{
                                backgroundColor: Colors.lightBlue,
                                borderColor: Colors.blue,
                                borderRadius: 10,
                                borderWidth: 1,
                                margin: 10,
                                padding: 10,
                            }}>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{diary.title}</Text>
                                {
                                    diary.value.map(content => {
                                        return <Text style={{ fontSize: 15, textAlign: 'center' }}>{content}</Text>
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }


    return background && (
        <ImageBackground source={background} style={styles.container}>
            <ScrollView style={styles.catsContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Félicitations !</Text>
                    <Text style={styles.subtitle}>Vous avez terminé votre journée</Text>
                </View>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(0)}
                >
                    <Text style={styles.catTitle}>Votre mantra du jour</Text>
                    <Text style={styles.catText}> {daily.mantra}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(1)}
                >
                    <Text style={styles.catTitle}>Exercice du jour</Text>
                    <Text style={styles.catText}>{daily.dayExercise}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(2)}
                >
                    <Text style={styles.catTitle}>Questions du jour</Text>
                    <Text style={styles.catText}>{'Score moyen des questions : ' + getAverageScore(daily.questions) + '/5'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(3)}
                >
                    <Text style={styles.catTitle}>Sentiments du jour</Text>
                    {getFeelings(daily.feelings)}
                    <Text style={styles.catText}>{'Note moyenne des sentiments : ' + getFeelingsNote(daily.feelings) + '/5'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(4)}
                >
                    <Text style={styles.catTitle}>Journaux du jour</Text>
                    {getDiaries(daily.diaries)}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(5)}
                >
                    <Text style={styles.catTitle}>Exercice de la nuit</Text>
                    <Text style={styles.catText}>{daily.nightExercise}</Text>
                </TouchableOpacity>


            </ScrollView>
        </ImageBackground>
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    catsContainer: {
        width: '100%',

    },

    catContainer: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
        padding: 20,
        alignItems: 'center',
        width: '100%',
        gap: 20,
        marginBottom: 20,
    },
    catTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    catText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    feelingsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'bottom',
    },
})