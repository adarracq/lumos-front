import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../shared/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function Feelings({ daily, setDaily, background }) {

    const [feelings, setFeelings] = React.useState([]);

    const getFeelings = () => {
        console.log(daily.feelings)
        let _feelings = [
            {
                title: 'Sport',
                value: daily.feelings[0].value,
                icon: 'sports-baseball'
            },
            {
                title: 'Travail',
                value: daily.feelings[1].value,
                icon: 'work'
            },
            {
                title: 'Nourriture',
                value: daily.feelings[2].value,
                icon: 'fastfood'
            },
            {
                title: 'Sommeil',
                value: daily.feelings[3].value,
                icon: 'hotel'
            },
            {
                title: 'Social',
                value: daily.feelings[4].value,
                icon: 'group'
            },
            {
                title: 'Stress',
                value: daily.feelings[5].value,
                icon: 'mood-bad'
            },
            {
                title: 'Relaxation',
                value: daily.feelings[6].value,
                icon: 'mood'
            },
            {
                title: 'Hobbies',
                value: daily.feelings[7].value,
                icon: 'sports-esports'
            },
            {
                title: 'Santé',
                value: daily.feelings[8].value,
                icon: 'local-hospital'
            },
            {
                title: 'Bonheur',
                value: daily.feelings[9].value,
                icon: 'sentiment-very-satisfied'
            },
            {
                title: 'Energie',
                value: daily.feelings[10].value,
                icon: 'battery-charging-full'
            }];
        setFeelings(_feelings);
    }

    const setFeeling = (index, value) => {
        feelings[index].value = value;
        setFeelings([...feelings])
    }

    const nextBtn = () => {
        if (feelings.some(feeling => feeling.value === null)) {
            ToastAndroid.show('Tout les champs ne sont pas remplis', ToastAndroid.SHORT);
            setDaily({ ...daily, feelings: feelings });
        }
        else {
            setDaily({ ...daily, feelings: feelings });
        }

    }


    useEffect(() => {
        getFeelings()
    }, [daily]);

    return background && (
        <ImageBackground
            source={background}
            style={styles.container}
        >
            <Text style={styles.title}>Vos ressentis du jour</Text>
            <ScrollView style={{ width: '100%' }}>
                {
                    feelings.map((feeling, index) => {
                        return (
                            <View key={index} style={styles.feelingContainer}>
                                <MaterialIcons name={feeling.icon} size={24} color={Colors.primary} />
                                <Text style={styles.feelingText}>{feeling.title}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    gap: 10,
                                }}>
                                    <TouchableOpacity
                                        onPress={() => setFeeling(index, 1)}
                                        style={feeling.value === 1 ? styles.smileySelected : styles.smiley}
                                    >
                                        <Text style={styles.smileyText}>😭</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setFeeling(index, 2)}
                                        style={feeling.value === 2 ? styles.smileySelected : styles.smiley}
                                    >
                                        <Text style={styles.smileyText}>😞</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setFeeling(index, 3)}
                                        style={feeling.value === 3 ? styles.smileySelected : styles.smiley}
                                    >
                                        <Text style={styles.smileyText}>🙂</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setFeeling(index, 4)}
                                        style={feeling.value === 4 ? styles.smileySelected : styles.smiley}
                                    >
                                        <Text style={styles.smileyText}>😁</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setFeeling(index, 5)}
                                        style={feeling.value === 5 ? styles.smileySelected : styles.smiley}
                                    >
                                        <Text style={styles.smileyText}>🤩</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity
                style={feelings.some(feeling => feeling.value === null) ? styles.buttonUnactive : styles.button}
                onPress={() => nextBtn()}
            >
                <Text style={styles.next}>Suivant</Text>
            </TouchableOpacity>
        </ImageBackground >
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
    feelingContainer: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
    },
    smiley: {
        padding: 5,
        borderRadius: 50,
    },
    smileySelected: {
        backgroundColor: Colors.lightGreen,
        padding: 5,
        borderRadius: 5,
    },
    smileyText: {
        fontSize: 20,
    },
    feelingText: {
        fontSize: 15,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
    buttonUnactive: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        opacity: 0.5
    },
    next: {
        color: 'white',
        fontSize: 20,
    }
})