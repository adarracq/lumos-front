import { View, Text, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mantra from '../components/Daily/Mantra';
import Exercise from '../components/Daily/Exercise';
import Questions from '../components/Daily/Questions';
import Feelings from '../components/Daily/Feelings';
import Diaries from '../components/Daily/Diaries';
import NightExercise from '../components/Daily/NightExercise';
import Summary from '../components/Daily/Summary';

export default function DailyScreen({ daily, setDaily }) {

    const [progress, setProgress] = useState(0)

    const getProgress = () => {
        if (!daily) return;
        if (daily.mantra && daily.mantra !== '') {
            setProgress(1);
        }
        if (daily.dayExercise && daily.dayExercise !== '') {
            setProgress(2);
        }
        if (daily.questions && daily.questions.length > 0) {
            setProgress(3);
        }
        if (daily.feelings && daily.feelings.length > 0) {
            setProgress(4);
        }
        if (daily.diaries && daily.diaries.length > 0) {
            setProgress(5);
        }
        if (daily.nightExercise && daily.nightExercise !== '') {
            setProgress(6);
        }
    }

    // si le bouton de retour du telephone est cliqué par l'utilisateur on revient à l'écran précédent
    useEffect(() => {
        const backAction = () => {
            if (progress > 0) {
                setProgress(progress - 1);
                return true;
            }
            else {
                Alert.alert("Quitter", "Voulez-vous vraiment quitter l'application ?", [
                    {
                        text: "Non",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Oui", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [progress]);

    const getRandomBackgroundPath = () => {
        const backgrounds = [
            require('../assets/backgrounds/bck0.jpg'),
            require('../assets/backgrounds/bck1.jpg'),
            require('../assets/backgrounds/bck2.jpg'),
            require('../assets/backgrounds/bck3.jpg'),
            require('../assets/backgrounds/bck4.jpg'),
            require('../assets/backgrounds/bck5.jpg'),
            require('../assets/backgrounds/bck6.jpg'),
            require('../assets/backgrounds/bck7.jpg'),
            require('../assets/backgrounds/bck8.jpg'),
            require('../assets/backgrounds/bck9.jpg'),
            require('../assets/backgrounds/bck10.jpg'),
            require('../assets/backgrounds/bck11.jpg'),
            require('../assets/backgrounds/bck12.jpg'),
        ];
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }


    useEffect(() => {
        setDaily(daily);
        getProgress();
    }, [daily]);

    switch (progress) {
        case 0:
            return (
                <Mantra daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        case 1:
            return (
                <Exercise daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        case 2:
            return (
                <Questions daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        case 3:
            return (
                <Feelings daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        case 4:
            return (
                <Diaries daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        case 5:
            return (
                <NightExercise daily={daily} setDaily={setDaily} background={getRandomBackgroundPath()} />
            )
        default:
            return (
                <Summary daily={daily} goTo={setProgress} background={getRandomBackgroundPath()} />
            )
    }
}