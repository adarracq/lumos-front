class DailyModel {
    date;
    mantra;
    dayExercise;
    questions;
    nightExercise;
    feelings;
    diaries;
    goals;

    constructor() {
        this.date = new Date();
        this.mantra = '';
        this.dayExercise = '';
        this.questions = [];
        this.nightExercise = '';
        this.feelings = [];
    }

    getMantra() {
        return this.mantra;
    }

    setMantra(value) {
        this.mantra = value;
    }

    getDayExercise() {
        return this.dayExercise;
    }

    setDayExercise(value) {
        this.dayExercise = value;
    }

    getQuestions() {
        return this.questions;
    }

    setQuestions(value) {
        this.questions = value;
    }

    getNightExercise() {
        return this.nightExercise;
    }

    setNightExercise(value) {
        this.nightExercise = value;
    }

    getFeelings() {
        return this.feelings;
    }

    setFeelings(value) {
        this.feelings = value;
    }

    getDate() {
        return this.date;
    }

    setDate(value) {
        this.date = value;
    }

    getDay() {
        return this.date.getDate();
    }

    getMonth() {
        return this.date.getMonth();
    }

    toJson() {
        return {
            date: this.date,
            mantra: this.mantra,
            dayExercise: this.dayExercise,
            questions: this.questions,
            nightExercise: this.nightExercise,
            feelings: this.feelings,
        };
    }


}

export default new DailyModel();