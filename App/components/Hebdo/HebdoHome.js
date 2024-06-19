import { View, Text } from 'react-native'
import React, { useState } from 'react'
import StartHebdo from './StartHebdo';
import { functions } from '../../shared/Functions';
import HebdoQuestions from './HebdoQuestions';

export default function HebdoHome({ weekly, setWeekly }) {

    const [progress, setProgress] = useState(-1)

    const getProgress = () => {
        if (!weekly) return;
        if (weekly.questions && weekly.questions.length > 0) {
            setProgress(1);
        }
    }


    switch (progress) {
        case -1:
            return (
                <StartHebdo background={functions.getRandomBackgroundPath()} setProgress={setProgress} />
            )
        case 0:
            return (
                <HebdoQuestions weekly={weekly} setWeekly={setWeekly} background={functions.getRandomBackgroundPath()} />
            )
        default:
            return (
                <Text>HebdoHome</Text>
            )
    }
}