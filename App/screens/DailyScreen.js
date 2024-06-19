import { View, Text, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mantra from '../components/Daily/Mantra';
import Exercise from '../components/Daily/Exercise';
import Questions from '../components/Daily/Questions';
import Feelings from '../components/Daily/Feelings';
import Diaries from '../components/Daily/Diaries';
import NightExercise from '../components/Daily/NightExercise';
import Summary from '../components/Daily/Summary';
import StartDay from '../components/Daily/StartDay';
import { functions } from '../shared/Functions';

export default function DailyScreen({ daily, setDaily }) {

    const [progress, setProgress] = useState(-1)

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


    useEffect(() => {
        setDaily(daily);
        getProgress();
    }, [daily]);

    switch (progress) {
        case -1:
            return (
                <StartDay background={functions.getRandomBackgroundPath()} setProgress={setProgress} />
            )
        case 0:
            return (
                <Mantra daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        case 1:
            return (
                <Exercise daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        case 2:
            return (
                <Questions daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        case 3:
            return (
                <Feelings daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        case 4:
            return (
                <Diaries daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        case 5:
            return (
                <NightExercise daily={daily} setDaily={setDaily} background={functions.getRandomBackgroundPath()} />
            )
        default:
            return (
                <Summary daily={daily} goTo={setProgress} background={functions.getRandomBackgroundPath()} />
            )
    }
}