import React, {useState} from 'react';
import {API_URL, API_TOKEN} from '@env';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
} from 'react-native';

const App = () => {
  const [userName, setUserName] = useState('');

  console.log(`baseUrl`, API_URL);

  const handleOnPress = () => {
    const users = ['Burak', 'Ozlem', 'Cinar', 'Seyhan'];
    const random = Math.floor(Math.random() * 10);
    setUserName(users[random]);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <Text>Welcome to BODB {userName || 'Anonymous'}</Text>
        <Button title="Set User" onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  },
});

export default App;
