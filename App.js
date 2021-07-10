import React, {useState} from 'react';
import {API_URL, API_KEY} from '@env';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from 'react-native';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState([]);

  const handleOnChangeSearch = term => {
    setSearchTerm(term);
    if (term.length) {
      const url = `${API_URL}/movie/${term}?api_key=${API_KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(`object`, data.poster_path);
          const {title, success} = data;
          if (success || !title) {
            setMovie('Movie not found');
          }
          if (title) {
            setMovie(data);
          }
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    } else {
      setMovie('Find your movie...');
    }
  };

  // const handleSearch = () => {
  //   console.log(`searchTerm`, searchTerm);
  //   const url = `${API_URL}search/movie/?api_key=${API_KEY}&query=jaws`;
  //   console.log(`url`, url);
  //   fetch(`${API_URL}search/movie/?api_key=${API_KEY}&query=jaws`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(function (error) {
  //       console.log(
  //         'There has been a problem with your fetch operation: ' +
  //           error.message,
  //       );
  //     });
  // };

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.header}>{movie.title}</Text>
          {/* <Image source={{uri: `${movie.poster_path}`}} /> */}
          <TextInput
            style={styles.input}
            onChangeText={handleOnChangeSearch}
            value={searchTerm}
            placeholder="Search movie"
          />
          {/* <Button title="Search Movie" onPress={handleSearch} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#eee',
    padding: 10,
  },
  container: {
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    marginTop: 10,
    height: 40,
    padding: 6,
    borderWidth: 1,
  },
});

export default App;
