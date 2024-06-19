import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../shared/Colors';
import { DailiesContext } from '../contexts/DailiesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../components/Profile/Profile';

export default function ProfileScreen({ navigation }) {

    const [dailies, setDailies] = useState(DailiesContext);

    const getDailies = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
                setDailies(dailies)
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getDailies();
    }, []);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.burger}
                onPress={() => navigation.openDrawer()}
            >
                <MaterialCommunityIcons name="forwardburger" size={40} color="white" />
            </TouchableOpacity>
            <Profile dailies={dailies} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    burger: {
        color: Colors.white,
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    }
})