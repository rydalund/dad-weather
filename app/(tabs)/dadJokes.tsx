import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DadJokesScreen() {
  const [jokes, setJokes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); 

  const fetchJoke = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();

      if (data?.joke) {
        setJokes(prev => [...prev, data.joke]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch dad joke:', err);
      setError("Uh oh! The jokes ran away 🏃‍♂️ - try again later!");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitial = async () => {
      for (let i = 0; i < 7; i++) {
        await fetchJoke();
      }
    };
    fetchInitial();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Dad Jokes</Text>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <FlatList
        data={jokes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.jokeText}>{item}</Text>}
        onEndReached={fetchJoke}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="#ff6f00" />
          ) : !hasMore ? (
            <Text style={styles.endText}>No more dad jokes for now 😢</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginVertical: 20,
    textAlign: 'center',
  },
  jokeText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#ccc',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#ff6f00',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  endText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
});