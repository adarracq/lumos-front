import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../shared/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { functions } from '../../shared/Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Thematics from '../../shared/Thematics';

export default function Summary({ daily, goTo, background }) {

    const [hebdoBilan, setHebdoBilan] = useState(0);
    const [mensuelBilan, setMensuelBilan] = useState(0);
    const navigation = useNavigation();
    const [theme, setTheme] = useState({});

    const getAverageScore = (questions) => {
        let total = 0;
        let nbQuestions = 0;
        questions.forEach(question => {
            if (question) {
                total += question
                nbQuestions++
            }
        })
        return Math.round((total / nbQuestions) * 10) / 10
    }

    const getFeelingsNote = (feelings) => {
        let total = 0;
        let nbFeelings = 0;
        feelings.forEach(feeling => {
            if (feeling.value) {
                total += feeling.value
                nbFeelings++
            }
        })
        return Math.round((total / nbFeelings) * 10) / 10
    }

    const getTheme = async () => {
        let _theme = {
            title: Thematics.thematics[daily.thematic].title,
            description: Thematics.thematics[daily.thematic].description,
            idea: Thematics.thematics[daily.thematic].idea,
        }
        setTheme(_theme);
    }


    const getWeeklies = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Weeklies')
            let weeklies = []
            if (jsonValue != null) {
                weeklies = JSON.parse(jsonValue)
            }
            // si il y a déjà un weekly pour cette semaine
            let weekNumber = functions.getWeekNumber(new Date());
            let dayOfWeek = new Date().getDay();

            const _weekly = weeklies.find(weekly => weekly.weekNumber == weekNumber - 1)

            let dailyFromLastWeek = await isThereDailyFromLastWeek();

            if (_weekly || !dailyFromLastWeek) {
                setHebdoBilan(7 - dayOfWeek);
            }
            else {
                setHebdoBilan(0);
            }

        } catch (e) {
            console.log(e)
        }
    }

    const getMonthlies = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Monthlies')
            let monthlies = []
            if (jsonValue != null) {
                monthlies = JSON.parse(jsonValue)
            }
            // si il y a déjà un monthly pour ce mois
            let month = new Date().getMonth();
            let dayOfMonth = new Date().getDate();

            const _monthly = monthlies.find(monthly => monthly.month == month - 1)

            let dailyFromLastMonth = await isThereDailyFromLastMonth();

            if (_monthly || !dailyFromLastMonth) {
                setMensuelBilan(30 - dayOfMonth);
            }
            else {
                setMensuelBilan(0);
            }

        } catch (e) {
            console.log(e)
        }
    }

    const isThereDailyFromLastMonth = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }
            // si il y a déjà un daily pour ce mois
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            if (month == 0)
                month = 12;
            else if (month < 10)
                month = '0' + month;

            let date = year + '-' + month;
            const _daily = dailies.find(daily => daily.date.includes(date))

            if (_daily) {
                return true;
            }
            else {
                return false;
            }

        } catch (e) {
            console.log(e)
        }
    }

    const isThereDailyFromLastWeek = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Dailies')
            let dailies = []
            if (jsonValue != null) {
                dailies = JSON.parse(jsonValue)
            }
            // si il y a déjà un daily pour cette semaine
            let weekNumber = functions.getWeekNumber(new Date());

            const _daily = dailies.find(daily => functions.getWeekNumber(new Date(daily.date)) == weekNumber - 1)

            if (_daily) {
                console.log('daily from last week')
                return true;
            }
            else {
                console.log('no daily from last week')
                return false;
            }

        } catch (e) {
            console.log(e)
        }
    }

    function goToHebdo() {
        if (hebdoBilan == 0) {
            navigation.navigate('BilanHebdo');
        }
        else {
            navigation.navigate('BilanHebdo');
            ToastAndroid.show("Le bilan hebdomadaire sera disponible dans " + hebdoBilan + " jours", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        getWeeklies();
        getMonthlies();
        getTheme();
    }, []);


    const getFeelings = (feelings) => {

        const _feelings = [
            { title: '😔', value: 1, categories: [], color: Colors.red, bckColor: Colors.lightRed },
            { title: '😐', value: 2, categories: [], color: Colors.blue, bckColor: Colors.lightBlue },
            { title: '😊', value: 4, categories: [], color: Colors.yellow, bckColor: Colors.lightYellow },
            { title: '😄', value: 5, categories: [], color: Colors.green, bckColor: Colors.lightGreen },
        ];

        feelings.forEach(feeling => {
            _feelings.forEach(_feeling => {
                if (feeling.value == _feeling.value && feeling.value != 3) {
                    _feeling.categories.push(feeling)
                }
            });
        });

        return (
            <View style={styles.feelingsContainer}>
                {
                    _feelings.map((feeling, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flex: 1,
                                    backgroundColor: feeling.bckColor,
                                    borderColor: feeling.color,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    margin: 2,
                                    paddingBottom: 10,
                                }}>
                                <Text style={{ fontSize: 25, textAlign: 'center' }}>{feeling.title}</Text>
                                {
                                    feeling.categories.map((_feeling, i) => {
                                        return <MaterialIcons
                                            key={i}
                                            name={_feeling.icon}
                                            size={24}
                                            color={feeling.color}
                                            style={{ textAlign: 'center' }}
                                        />
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    const getDiaries = (diaries) => {

        return (
            <View style={{ width: '100%' }} >
                {
                    diaries.map((diary, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: Colors.lightBlue,
                                    borderColor: Colors.blue,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    margin: 10,
                                    padding: 10,
                                }}>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{diary.title}</Text>
                                {
                                    diary.value.map((content, index) => {
                                        return <Text key={index} style={{ fontSize: 15, textAlign: 'center' }}>{content}</Text>
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }


    return background && daily && (
        <ImageBackground
            //source={background} 
            style={styles.container}>
            <ScrollView style={styles.catsContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Félicitations !</Text>
                    <Text style={styles.subtitle}>Vous avez terminé votre journée</Text>
                </View>
                <View
                    style={styles.catContainer}
                    onPress={() => goTo(0)}
                >
                    <Text style={styles.catTitle}>{theme.title}</Text>
                    <Text style={styles.description}> {theme.description}</Text>
                    <Text style={styles.catText}> {theme.idea}</Text>
                </View>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(0)}
                >
                    <Text style={styles.catTitle}>Votre mantra du jour</Text>
                    <Text style={styles.catText}> {daily.mantra}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(1)}
                >
                    <Text style={styles.catTitle}>Exercice du jour</Text>
                    <Text style={styles.catText}>{daily.dayExercise}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(2)}
                >
                    <Text style={styles.catTitle}>Questions du jour</Text>
                    <Text style={styles.catText}>{'Score moyen des questions : ' + getAverageScore(daily.questions) + '/5'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(3)}
                >
                    <Text style={styles.catTitle}>Sentiments du jour</Text>
                    {getFeelings(daily.feelings)}
                    <Text style={styles.catText}>{'Note moyenne des sentiments : ' + getFeelingsNote(daily.feelings) + '/5'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(4)}
                >
                    <Text style={styles.catTitle}>Journaux du jour</Text>
                    {getDiaries(daily.diaries)}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.catContainer}
                    onPress={() => goTo(5)}
                >
                    <Text style={styles.catTitle}>Exercice de la nuit</Text>
                    <Text style={styles.catText}>{daily.nightExercise}</Text>
                </TouchableOpacity>


            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={hebdoBilan == 0 ? styles.buttonHebdo : styles.buttonHebdoUnavailable}
                    onPress={() => { goToHebdo() }}
                >
                    <Text style={hebdoBilan == 0 ? styles.bilanTitle : styles.bilanTitleUnavailable}>Bilan Hebdo</Text>
                    <Text style={hebdoBilan == 0 ? styles.bilanText : styles.bilanTextUnavailable}>{hebdoBilan == 0 ? 'Disponible' : 'Dans ' + hebdoBilan + ' jours'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mensuelBilan == 0 ? styles.buttonMonth : styles.buttonMonthUnavailable}
                    onPress={() => { }}
                >
                    <Text style={mensuelBilan == 0 ? styles.bilanTitle : styles.bilanTitleUnavailable}>Bilan Mensuel</Text>
                    <Text style={mensuelBilan == 0 ? styles.bilanText : styles.bilanTextUnavailable}>{mensuelBilan == 0 ? 'Disponible' : 'Dans ' + mensuelBilan + ' jours'}</Text>
                </TouchableOpacity>
            </View>
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
    description: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 10,
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    catsContainer: {
        width: '100%',

    },

    catContainer: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
        padding: 20,
        alignItems: 'center',
        width: '100%',
        gap: 20,
        marginBottom: 20,
    },
    catTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    catText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    feelingsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'bottom',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: ScreenWidth,
        marginTop: 2,
    },
    buttonMonth: {
        backgroundColor: Colors.lightBlue,
        color: 'black',
        padding: 10,
        borderTopLeftRadius: 30,
        alignItems: 'flex-end',
        width: ScreenWidth / 2 - 10,
        borderColor: Colors.blue,
        borderWidth: 2,
    },
    buttonMonthUnavailable: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        borderTopLeftRadius: 30,
        alignItems: 'flex-end',
        width: ScreenWidth / 2 - 10,
        opacity: 0.5
    },
    buttonHebdo: {
        backgroundColor: Colors.lightBlue,
        color: 'black',
        padding: 10,
        borderTopRightRadius: 30,
        alignItems: 'flex-start',
        width: ScreenWidth / 2 - 10,
        borderColor: Colors.blue,
        borderWidth: 2,
    },
    buttonHebdoUnavailable: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        borderTopRightRadius: 30,
        alignItems: 'flex-start',
        width: ScreenWidth / 2 - 10,
        opacity: 0.5
    },
    bilanTitle: {
        color: Colors.blue,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bilanTitleUnavailable: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bilanText: {
        color: Colors.blue,
        fontSize: 15,
        textAlign: 'center',
    },
    bilanTextUnavailable: {
        color: Colors.white,
        fontSize: 15,
        textAlign: 'center',
    },
})