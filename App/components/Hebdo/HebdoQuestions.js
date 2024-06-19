import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeeklyQuestions from '../../shared/WeeklyQuestions';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../shared/Colors';
import ProgressBar from 'react-native-progress/Bar';

export default function HebdoQuestions({ weekly, setWeekly, background }) {

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [remark, setRemark] = useState('');

    const getQuestions = async () => {
        const thematics = WeeklyQuestions.questions;
        let _questions = [];
        thematics.forEach(thematic => {
            thematic.questions.forEach(question => {
                _questions.push({ thematic: thematic.thematic, question });
            });
        });

        setQuestions(_questions);

        if (weekly?.questions.length > 0 || answers.length > 0) return;

        _questions.map(() => {
            setAnswers([...answers, null]);
        });
    }

    const setAnswer = (answer) => {
        answers[currentQuestion] = answer;
        setAnswers([...answers]);
    }

    const nextQuestion = () => {
        if (answers[currentQuestion] == null) return;
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            weekly.questions = answers;
            setWeekly({ ...weekly });
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return background && (
        <ImageBackground
            //source={background}
            style={styles.container}
        >
            <View style={styles.progressContainer}>
                <Text style={styles.title}>Questions de la semaine</Text>
                <Text style={styles.progressText}>{currentQuestion + 1}/{questions.length}</Text>
                <ProgressBar
                    progress={(currentQuestion + 1) / questions.length}
                    width={Dimensions.get("window").width - 60}
                    color={Colors.lightGreen}
                />
            </View>
            <Text style={styles.question}>{questions[currentQuestion]?.question}</Text>

            <View style={styles.answersContainer}>
                <TouchableOpacity
                    style={answers[currentQuestion] === 1 ? styles.answerSelected : styles.answer}
                    onPress={() => setAnswer(1)}
                >
                    <View style={[styles.starContainer, { backgroundColor: Colors.qRed }]}>
                        <Text style={styles.starText}>1</Text>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.answerText}>Pas du tout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={answers[currentQuestion] === 2 ? styles.answerSelected : styles.answer}
                    onPress={() => setAnswer(2)}
                >
                    <View style={[styles.starContainer, { backgroundColor: Colors.qOrange }]}>
                        <Text style={styles.starText}>2</Text>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.answerText}>Pas assez</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={answers[currentQuestion] === 3 ? styles.answerSelected : styles.answer}
                    onPress={() => setAnswer(3)}
                >
                    <View style={[styles.starContainer, { backgroundColor: Colors.qGrey }]}>
                        <Text style={styles.starText}>3</Text>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.answerText}>Neutre</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={answers[currentQuestion] === 4 ? styles.answerSelected : styles.answer}
                    onPress={() => setAnswer(4)}
                >
                    <View style={[styles.starContainer, { backgroundColor: Colors.qYellow }]}>
                        <Text style={styles.starText}>4</Text>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.answerText}>Beaucoup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={answers[currentQuestion] === 5 ? styles.answerSelected : styles.answer}
                    onPress={() => setAnswer(5)}
                >
                    <View style={[styles.starContainer, { backgroundColor: Colors.qGreen }]}>
                        <Text style={styles.starText}>5</Text>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.answerText}>Complètement</Text>
                </TouchableOpacity>
            </View>
            {<View style={styles.remarkContainer}>
                <TextInput
                    style={styles.remarkInput}
                    value={answers[currentQuestion]?.remark}
                    placeholder='Remarques, exemples...'
                    onChangeText={(text) => {
                        setRemark(text);
                    }}
                />
            </View>}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={currentQuestion === 0 ? styles.buttonPrecUnavailable : styles.buttonPrec}
                    onPress={() => {
                        if (currentQuestion > 0) {
                            setCurrentQuestion(currentQuestion - 1);
                        }
                    }}
                >
                    <AntDesign name="leftcircle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={answers[currentQuestion] == null ? styles.buttonNextUnavailable : styles.buttonNext}
                    onPress={() => nextQuestion()}
                >
                    <AntDesign name="rightcircle" size={24} color="white" />
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
        objectFit: 'cover',
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        marginTop: 50,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        padding: 30,
        width: ScreenWidth,
    },
    answersContainer: {
        flexDirection: 'columon',
        justifyContent: 'space-around',
        width: ScreenWidth - 40,
        gap: 10,
    },
    answer: {
        backgroundColor: 'rgba(255, 255, 255, .7)',
        width: ScreenWidth - 40,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    answerSelected: {
        backgroundColor: Colors.lightGreen,
        width: ScreenWidth - 40,
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        borderRadius: 30,
    },
    starText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    answerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressContainer: {
        width: ScreenWidth - 40,
        padding: 10,
    },
    progressText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    remarkContainer: {
        width: ScreenWidth,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
    },
    remarkInput: {
        backgroundColor: 'rgba(255, 255, 255, .7)',
        width: ScreenWidth - 40,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: ScreenWidth,
    },
    buttonNext: {
        backgroundColor: 'rgba(255, 255, 255, .4)',
        color: 'black',
        padding: 10,
        borderTopLeftRadius: 30,
        alignItems: 'flex-end',
        width: ScreenWidth / 2 - 10,
    },
    buttonNextUnavailable: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        borderTopLeftRadius: 30,
        alignItems: 'flex-end',
        width: ScreenWidth / 2 - 10,
        opacity: 0.5
    },
    buttonPrec: {
        backgroundColor: 'rgba(255, 255, 255, .4)',
        color: 'black',
        padding: 10,
        borderTopRightRadius: 30,
        alignItems: 'flex-start',
        width: ScreenWidth / 2 - 10,
    },
    buttonPrecUnavailable: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        borderTopRightRadius: 30,
        alignItems: 'flex-start',
        width: ScreenWidth / 2 - 10,
        opacity: 0.5
    },
    advice: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, .6)',
        width: ScreenWidth - 40,
        padding: 20,
        borderRadius: 30,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
    continue: {
        color: 'white',
        fontSize: 20,
    },

});