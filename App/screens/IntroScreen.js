import { View, Text, StyleSheet, Image, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../shared/Colors';
import MainNav from '../navigations/MainNav';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntroScreen({ _showIntro }) {

    const [showIntro, setShowIntro] = useState();

    useEffect(() => {
        setShowIntro(_showIntro);
    }, [_showIntro]);

    const slides = [
        {
            key: 1,
            title: 'Un voyage vers le bonheur',
            text: 'Vous êtes sur le point de démarrer un voyage qui vous transformera. Un voyage vers une meilleure version de vous-même. Une vie plus épanouie et harmonieuse.',
            image: require('../assets/intro1.png'),
            backgroundColor: Colors.yellow,
        },
        {
            key: 2,
            title: 'Lumos sera votre guide',
            text: "Chaque jour, répondez à quelques questions pour cultiver la conscience de soi. Récitez un mantra qui vous inspire. Choisissez un exercice pour développer l'amour, la sagesse ou la créativité.",
            image: require('../assets/intro2.png'),
            backgroundColor: Colors.blue
        },
        {
            key: 3,
            title: 'Une progression',
            text: 'Chaque semaine et chaque mois, suivez vos progrès. Observez votre évolution. Soyez fier de vos réussites.',
            image: require('../assets/intro3.png'),
            backgroundColor: Colors.purple,
        },
        {
            key: 4,
            title: 'Votre jardin secret',
            text: ' Lumos est un jardin où vous cultivez votre bien-être. Un jardin où vous nourrissez votre âme. Un jardin où vous fleurissez.',
            image: require('../assets/intro4.png'),
            backgroundColor: Colors.green,
        },
        {
            key: 5,
            title: 'Maintenant',
            text: "Commencez votre voyage dès aujourd'hui.",
            image: require('../assets/intro5.png'),
            backgroundColor: Colors.orange,
        },
    ];

    const onDone = () => {
        setShowIntro(false);
    };

    const RenderItem = ({ item }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingBottom: 100,
                }}>
                <Image
                    style={styles.introImageStyle}
                    source={item.image} />
                <Text style={styles.introTextStyle}>
                    {item.text}
                </Text>
            </View>
        );
    };

    const RenderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-right"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    const RenderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="check"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    return (
        <>
            {showIntro ? (
                <AppIntroSlider
                    data={slides}
                    renderItem={RenderItem}
                    onDone={onDone}
                    renderDoneButton={RenderDoneButton}
                    renderNextButton={RenderNextButton}
                />
            ) : (
                <MainNav />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    introImageStyle: {
        width: 250,
        height: 250,
        backgroundColor: Colors.lightGray,
        borderRadius: 50,
    },
    introTextStyle: {
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
        padding: 30,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});