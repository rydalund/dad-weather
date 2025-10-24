import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MAX_JOKE_LENGTH = 80;

export default function DadJoke() {
    const [joke, setJoke] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDadJoke = async () => {
        try {
            setLoading(true);
            setError(null);

            let found = false;
            let attempts = 0;
            let data;

            while (!found && attempts < 10) {
                const res = await fetch('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'application/json' },
                });
                data = await res.json();
                if (data.joke.length <= MAX_JOKE_LENGTH) {
                    found = true;
                }
                attempts++;
            }

            if (found && data?.joke) {
                setJoke(data.joke);
            } else {
                setError("Joke went missing… classic Dad move 😜");
            }
        } catch (err) {
            setError("404: Joke not found. Try again! 😉");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDadJoke();
    }, []);

    return (
        <View style={styles.container}>
            {!loading && <View style={styles.divider} />}

            {loading ? (
                <ActivityIndicator size="small" color="#ff6f00" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <TouchableOpacity onPress={fetchDadJoke} activeOpacity={0.7}>
                    <Text style={styles.jokeText}>
                        "{joke}" <Text style={styles.emoji}>🔄</Text>
                    </Text>
                </TouchableOpacity>
            )}

            {!loading && <View style={styles.divider} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 60,
        alignItems: 'center',
    },
    divider: {
        height: 2,
        alignSelf: 'stretch',
        backgroundColor: '#444',
        marginVertical: 20,
    },
    jokeText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#cccccc',
        textAlign: 'center',
        maxWidth: 300,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    emoji: {
        fontSize: 18,
    },
    errorText: {
        fontSize: 16,
        color: '#ff6f00',
        textAlign: 'center',
    },
});