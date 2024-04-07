import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../shared/Colors';

export default function Diaries({ daily, setDaily, background }) {

    const [diaries, setDiaries] = React.useState([]);

    const getDiaries = () => {
        let _diaries = [
            {
                title: 'Journal de gratitude',
                value: [
                    daily.diaries[0].value[0],
                    daily.diaries[0].value[1],
                    daily.diaries[0].value[2]
                ],
                text: 'Notez 3 choses pour lesquelles vous êtes reconnaissant en utilisant des mots sincères et positifs.'
            },
            {
                title: 'Journal de positivité',
                value: [
                    daily.diaries[1].value[0],
                    daily.diaries[1].value[1],
                    daily.diaries[1].value[2]
                ],
                text: "Notez 3 choses que vous avez bien faites ou appréciées pendant la journée."
            },
            {
                title: 'Journal des objectifs',
                value: [
                    daily.diaries[2].value[0],
                    daily.diaries[2].value[1],
                    daily.diaries[2].value[2]
                ],
                text: "Notez 3 choses que vous souhaitez faire demain."
            },
        ];
        setDiaries(_diaries);
    }

    const nextBtn = () => {
        setDaily({ ...daily, diaries: diaries });
    }

    const isFilled = () => {
        if (!diaries || diaries.length === 0) return false;
        return diaries[0].value[0] && diaries[0].value[1] && diaries[0].value[2] && diaries[1].value[0] && diaries[1].value[1] && diaries[1].value[2] && diaries[2].value[0] && diaries[2].value[1] && diaries[2].value[2];
    }

    useEffect(() => {
        getDiaries();
    }, [daily]);

    return (
        <ImageBackground source={background} style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>Vos Journaux quotidiens</Text>
                {diaries.map((diary, index) => (
                    <View key={index} style={styles.diary}>
                        <Text style={styles.title2}>{diary.title}</Text>
                        <Text style={styles.text}>{diary.text}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Toutes ma famille est en bonne santé..."
                            value={diary.value[0]}
                            onChangeText={(text) => {
                                let _diaries = [...diaries];
                                _diaries[index].value[0] = text;
                                setDiaries(_diaries);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="J'ai bien travaillé sur mon projet..."
                            value={diary.value[1]}
                            onChangeText={(text) => {
                                let _diaries = [...diaries];
                                _diaries[index].value[1] = text;
                                setDiaries(_diaries);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Je viens de faire du sport..."
                            value={diary.value[2]}
                            onChangeText={(text) => {
                                let _diaries = [...diaries];
                                _diaries[index].value[2] = text;
                                setDiaries(_diaries);
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={isFilled() ? styles.button : styles.buttonUnactive}
                onPress={() => nextBtn()}
            >
                <Text style={styles.next}>Suivant</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

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
    scroll: {
        width: '100%',
    },
    diary: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
    text: {
        fontSize: 16,
        color: Colors.white,
        textAlign: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
    buttonUnactive: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        opacity: 0.5
    },
    next: {
        color: 'white',
        fontSize: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        width: '100%',
        padding: 5,
        paddingLeft: 20,
        margin: 5,
        borderRadius: 10,
    }
});