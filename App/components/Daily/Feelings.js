import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../shared/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function Feelings({ daily, setDaily, background }) {

    const [feelings, setFeelings] = React.useState([]);

    const getFeelings = () => {
        let _feelings = [
            {
                title: 'Sommeil',
                value: daily.feelings[0]?.value,
                icon: 'hotel'
            },
            {
                title: 'Santé',
                value: daily.feelings[1]?.value,
                icon: 'local-hospital'
            },
            {
                title: 'Nourriture',
                value: daily.feelings[2]?.value,
                icon: 'fastfood'
            },
            {
                title: 'Sport',
                value: daily.feelings[3]?.value,
                icon: 'sports-baseball'
            },
            {
                title: 'Travail',
                value: daily.feelings[4]?.value,
                icon: 'work'
            },
            {
                title: 'Social',
                value: daily.feelings[5]?.value,
                icon: 'group'
            },
            {
                title: 'Relaxation',
                value: daily.feelings[6]?.value,
                icon: 'spa'
            },
            {
                title: 'Bonheur',
                value: daily.feelings[7]?.value,
                icon: 'mood'
            },
            {
                title: 'Energie',
                value: daily.feelings[8]?.value,
                icon: 'battery-charging-full'
            }];
        setFeelings(_feelings);
    }

    const setFeeling = (index, value) => {
        feelings[index].value = value;

        setFeelings([...feelings])
    }

    const getBackgroundColor = (value) => {
        switch (value) {
            case 1:
                return 'rgba(255, 255, 0, 0.1)';
            case 2:
                return 'rgba(255, 255, 0, .2)';
            case 3:
                return 'rgba(255, 255, 0, .4)';
            case 4:
                return 'rgba(255, 255, 0, .6)';
            case 5:
                return 'rgba(255, 255, 0, .9)';
            default:
                return 'rgba(255, 255, 0, .4)';
        }
        switch (value) {
            case 1:
                return 'rgba(255, 0, 0, 0.5)';
            case 2:
                return 'rgba(255, 128, 0, 0.6)';
            case 3:
                return 'rgba(255, 200, 0, 0.7)';
            case 4:
                return 'rgba(255, 255, 50, 0.8)';
            case 5:
                return 'rgba(255, 255, 0, 0.9)';
            default:
                return 'rgba(255, 200, 0, 0.7)';
        }
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
            //source={background}
            style={styles.container}
        >
            <Text style={styles.title}>Vos ressentis du jour</Text>

            {
                feelings.map((feeling, index) => {
                    return (
                        <View key={index} style={{
                            ...styles.feelingContainer,
                            backgroundColor: getBackgroundColor(feeling.value)
                        }}>

                            <MaterialIcons name={feeling.icon} size={30} color={Colors.white} />
                            <Slider
                                style={{ width: '70%', height: 40 }}
                                minimumValue={1}
                                maximumValue={5}
                                step={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#FFFFFF"
                                thumbTintColor={Colors.white}
                                value={feeling.value ? feeling.value : 3}
                                onValueChange={value => setFeeling(index, value)}
                            />
                            <Text style={styles.feelingText}>{feeling.title}</Text>
                        </View>
                    )
                })
            }
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
    },
    feelingText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.white,
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