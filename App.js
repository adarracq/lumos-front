if (__DEV__) {
  require("./ReactotronConfig");
}
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './App/screens/IntroScreen';
import { DailiesContext } from './App/contexts/DailiesContext';
import { useState } from 'react';

export default function App() {

  const [dailies, setDailies] = useState([]);

  return (
    <DailiesContext.Provider value={{ dailies, setDailies }}>
      <View style={styles.container}>
        <IntroScreen
          _showIntro={false}
        />
        <StatusBar style="light" />
      </View>
    </DailiesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
