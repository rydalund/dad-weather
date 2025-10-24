import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocationStore } from '@/stores/useLocationStore';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';
import { useNavigation } from '@react-navigation/native';

export default function Forecast() {
  const { location } = useLocationStore();
  const navigation = useNavigation();

  const { forecast, locationName, loading, error } = useWeatherForecast(
    location?.lat || 0,
    location?.lon || 0
  );

  if (!location) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>
          No location selected - select here:
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('index' as never)}
          style={{ marginTop: 10 }}
        >
          <Ionicons name="home" size={28} color="#ff6f00" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#ff6f00" />
        <Text style={styles.text}>Loading forecast...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          5-Day Forecast for {locationName || 'Unknown location'}
        </Text>

        {forecast.map((day) => (
          <View key={day.date} style={styles.card}>
            <View style={styles.leftCard}>
              <Text style={styles.date}>{day.date}</Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${day.icon}@2x.png` }}
                style={styles.icon}
              />
            </View>

            <View style={styles.rightCard}>
              <Text style={styles.temp}>{day.temp}</Text>
              <Text style={styles.desc}>{day.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  leftCard: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightCard: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  date: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  icon: {
    width: 60,
    height: 60,
  },
  temp: {
    color: '#ff6f00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    color: '#ccc',
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});