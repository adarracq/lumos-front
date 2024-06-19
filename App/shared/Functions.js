export const functions = {
    getWeekNumber,
    getRandomBackgroundPath
};

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    var year = d.getUTCFullYear();
    return year + '-' + weekNo;
}

function getRandomBackgroundPath() {
    const backgrounds = [
        require('../assets/backgrounds/bck0.jpg'),
        require('../assets/backgrounds/bck1.jpg'),
        require('../assets/backgrounds/bck2.jpg'),
        require('../assets/backgrounds/bck3.jpg'),
        require('../assets/backgrounds/bck4.jpg'),
        require('../assets/backgrounds/bck5.jpg'),
        require('../assets/backgrounds/bck6.jpg'),
        require('../assets/backgrounds/bck7.jpg'),
        require('../assets/backgrounds/bck8.jpg'),
        require('../assets/backgrounds/bck9.jpg'),
        require('../assets/backgrounds/bck10.jpg'),
        require('../assets/backgrounds/bck11.jpg'),
        require('../assets/backgrounds/bck12.jpg'),
        require('../assets/backgrounds/bck13.jpg'),
        require('../assets/backgrounds/bck14.jpg'),
        require('../assets/backgrounds/bck15.jpg'),
        require('../assets/backgrounds/bck16.jpg'),
        require('../assets/backgrounds/bck17.jpg'),
        require('../assets/backgrounds/bck18.jpg'),
    ];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}