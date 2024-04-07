import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../shared/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailiesContext } from '../contexts/DailiesContext';
import DailyScreen from './DailyScreen';

export default function HomeScreen({ navigation }) {

    const [dailies, setDailies] = useState(DailiesContext);
    const [currentDaily, setCurrentDaily] = useState(null);

    const deleteDailies = async () => {
        try {
            await AsyncStorage.removeItem('Dailies')
            console.log('dailies deleted')
        } catch (e) {
            console.log(e)
        }
    }


    const getDailies = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }
            // si il y a déjà un daily pour aujourd'hui
            const today = new Date().toISOString().split('T')[0];
            const _daily = dailies.find(daily => daily.date === today)
            if (_daily) {
                setCurrentDaily(_daily)
                setDailies(dailies)
                return
            }
            const daily = {
                date: new Date().toISOString().split('T')[0],
                thematic: getThematic(dailies),
                mantra: '',
                dayExercise: '',
                questions: [],
                nightExercise: '',
                feelings: [],
                diaries: [],
                goals: []
            }
            dailies.push(daily)
            await AsyncStorage.setItem('Dailies', JSON.stringify(dailies))

            setCurrentDaily(daily)
            setDailies(dailies)

        } catch (e) {
            console.log(e)
        }
    }

    const saveDaily = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }
            const today = new Date().toISOString().split('T')[0];
            const _daily = dailies.find(daily => daily.date === today)
            if (_daily) {
                _daily.mantra = currentDaily.mantra
                _daily.dayExercise = currentDaily.dayExercise
                _daily.questions = currentDaily.questions
                _daily.nightExercise = currentDaily.nightExercise
                _daily.feelings = currentDaily.feelings
                _daily.diaries = currentDaily.diaries
                await AsyncStorage.setItem('Dailies', JSON.stringify(dailies))
                console.log('daily updated')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getThematic = (dailies) => {
        if (dailies.length == 0 || dailies.length == 1) {
            return 0
        }
        else {
            return dailies[dailies.length - 2].thematic + 1
        }
    }

    useEffect(() => {
        //deleteDailies();
        getDailies();
    }, []);

    useEffect(() => {
        saveDaily();
    }, [currentDaily]);


    return (
        <View style={styles.container}>
            <DailyScreen daily={currentDaily} setDaily={setCurrentDaily} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    date: {
        fontSize: 20,
        color: Colors.white,
    }
})