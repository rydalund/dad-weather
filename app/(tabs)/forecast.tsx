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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginVertical: 20,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  date: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  leftCard: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  rightCard: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
});