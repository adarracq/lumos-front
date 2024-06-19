import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HebdoHome from '../components/Hebdo/HebdoHome';
import Colors from '../shared/Colors';
import { functions } from '../shared/Functions';

export default function BilanHebdoScreen({ navigation }) {

    const [currentWeekly, setCurrentWeekly] = useState(null);

    const getWeekly = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Weeklies')
            let weeklies = []
            if (jsonValue != null) {
                weeklies = JSON.parse(jsonValue)
            }
            // si il y a déjà un weekly pour cette semaine
            const year = new Date().getUTCFullYear();
            const _weekNumber = year + '-' + functions.getWeekNumber(new Date());;
            const _weekly = weeklies.find(weekly => weekly.weekNumber == _weekNumber)
            if (_weekly) {
                setCurrentWeekly(_weekly)
                return
            }

            const weekly = {
                weekNumber: _weekNumber,
                questions: [],
                dailies: await getDailiesFromWeek(_weekNumber)
            }
            weeklies.push(weekly)
            await AsyncStorage.setItem('Weeklies', JSON.stringify(weeklies))
            setCurrentWeekly(weekly)

        } catch (e) {
            console.log(e)
        }
    }

    const getDailiesFromWeek = async (weekNumber) => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }

            const dailiesFromWeek = dailies.filter(daily => functions.getWeekNumber(new Date(daily.date)) === weekNumber)
            return dailiesFromWeek
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.burger}
                onPress={() => navigation.openDrawer()}
            >
                <MaterialCommunityIcons name="forwardburger" size={40} color="white" />
            </TouchableOpacity>
            <HebdoHome weekly={currentWeekly} setWeekly={setCurrentWeekly} />
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
        top: 20,
        left: 5,
        zIndex: 1,
    }
})