import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../shared/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailiesContext } from '../contexts/DailiesContext';
import DailyScreen from './DailyScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

    const [dailies, setDailies] = useState(DailiesContext);
    const [currentDaily, setCurrentDaily] = useState(null);

    //fonction de test
    const deleteDailies = async () => {
        try {
            await AsyncStorage.removeItem('Dailies')
            console.log('dailies deleted')
        } catch (e) {
            console.log(e)
        }
    }
    //fonction de test
    const removeLastDaily = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }
            dailies.pop()
            await AsyncStorage.setItem('Dailies', JSON.stringify(dailies))
            console.log('daily removed')
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
            // si il n'y a pas de daily pour aujourd'hui
            const daily = {
                date: new Date().toISOString().split('T')[0],
                thematic: getThematic(dailies),
                mantra: '',
                dayExercise: '',
                questions: [],
                nightExercise: '',
                feelings: [],
                diaries: [],
                todayGoals: dailies.length > 0 ? dailies[dailies.length - 1].diaries[2] : []
            }
            dailies.push(daily)
            await AsyncStorage.setItem('Dailies', JSON.stringify(dailies))

            setCurrentDaily(daily)
            setDailies(dailies)
            console.log(dailies)

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
                _daily.thematic = currentDaily.thematic
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
        if (dailies.length == 0)
            return 0
        else
            return (dailies[dailies.length - 1].thematic + 1) % 14
    }

    useEffect(() => {
        //deleteDailies();
        //removeLastDaily();
        getDailies();
    }, []);

    useEffect(() => {
        saveDaily();
    }, [currentDaily]);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.burger}
                onPress={() => navigation.openDrawer()}
            >
                <MaterialCommunityIcons name="forwardburger" size={30} color={Colors.lightGray2} />
            </TouchableOpacity>
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
    burger: {
        color: Colors.white,
        position: 'absolute',
        top: 40,
        left: 5,
        zIndex: 1,
    }
})