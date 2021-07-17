import React, {useState} from 'react';
import {API_URL, API_KEY} from '@env';

import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [totalMovieResults, setTotalMovieResults] = useState(undefined);

  const handleOnChangeSearch = term => {
    setSearchTerm(term);
  };

  const handleSearch = () => {
    if (searchTerm) {
      const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const {results, total_results: totalResults} = data;
          setTotalMovieResults(totalResults);
          if (totalResults > 0) {
            setMovies(results);
          }
          if (totalResults === 0) {
            setMovies([]);
            setMessage('Movies not found');
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    } else {
      setMovies([]);
      setMessage('Please enter a search value');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleOnChangeSearch}
            value={searchTerm}
            placeholder="Search movie"
          />
          <Button title="Search Movie" onPress={handleSearch} />
        </View>
        <ScrollView style={styles.scrollView}>
          {totalMovieResults > 0 &&
            movies.map(item => (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                }}
                style={styles.posterBox}
              />
            ))}
          <Text style={styles.messageStyle}>{message}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  messageStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    flex: 1,
    marginTop: 20,
  },
  posterBox: {
    maxWidth: 400,
    height: 600,
    marginBottom: '2%',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderColor: 'black',
  },
});

export default App;
