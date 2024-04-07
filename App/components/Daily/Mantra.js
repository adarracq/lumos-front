import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Thematics from '../../shared/Thematics';
import { AntDesign } from '@expo/vector-icons';

export default function Mantra({ daily, setDaily, background }) {

    const [mantra, setMantra] = useState('');
    const [timer, setTimer] = useState(60);

    const getMantra = () => {
        if (!daily) return;
        if (mantra !== '') return;
        if (daily.mantra && daily.mantra !== '')
            setMantra(daily.mantra);
        else {
            let _mantra = Thematics.thematics[daily.thematic].mantras[Math.floor(Math.random() * Thematics.thematics[daily.thematic].mantras.length)];
            setMantra(_mantra);
        }
    }



    useEffect(() => {
        getMantra();
    }, [daily]);


    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    return 'Continuer';
                }
            });
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return background && (
        <ImageBackground
            source={background}
            style={styles.container}>
            <Text style={styles.title}>Votre mantra du jour</Text>
            <Text></Text>
            <Text style={styles.mantra}>{mantra}</Text>
            <Text style={styles.advice}>
                {"Répétez vous plusieurs fois ce mantra en le ressentant profondément.\n\nVisualisez les effets positifs que le mantra aura sur votre vie.\n\nMéditez sur le mantra pour en intérioriser le message."}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setDaily({ ...daily, mantra: mantra });
                }}
            >
                <Text style={styles.timer}>{timer}</Text>
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
    mantra: {
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
    timer: {
        color: 'white',
        fontSize: 20,
    }
});