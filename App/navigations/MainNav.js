import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import AllMeditationsScreen from '../screens/AllMeditationsScreen';
import AllExercisesScreen from '../screens/AllExercisesScreen';
import AllDiariesScreen from '../screens/AllDiariesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../shared/Colors';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function MainNav() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Suivi quotidien"
                // remove the title of the screen
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: 'transparent',

                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    drawerActiveTintColor: Colors.primary,
                    drawerInactiveTintColor: Colors.secondary,
                }}
            >
                <Drawer.Screen name="Suivi quotidien" component={HomeScreen} />
                <Drawer.Screen name="Exercises" component={AllExercisesScreen} />
                <Drawer.Screen name="Meditations" component={AllMeditationsScreen} />
                <Drawer.Screen name="Journaux" component={AllDiariesScreen} />
                <Drawer.Screen name="Profil" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}