import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useWeather } from '@/hooks/useWeather';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { Unit } from '@/constants/unit';

interface WeatherCardProps {
  lat: number;
  lon: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ lat, lon }) => {
  const { data, loading, error } = useWeather(lat, lon);
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const { unit } = useSettingsStore();

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  if (error || !data) {
    return <Text style={styles.errorText}>Error reading weather data</Text>;
  }

  const isFavorite = favorites.some(
    (fav) => fav.city.toLowerCase() === data.name.toLowerCase()
  );

  const toggleFavorite = () => {
    const location = {
      city: data.name,
      lat,
      lon,
    };

    if (isFavorite) {
      removeFavorite(data.name);
    } else {
      addFavorite(location);
    }
  };

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{data.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color="#ff0000"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: iconUrl }} style={styles.icon} />

      <Text style={styles.temp}>
        {Math.round(data.temp)}° {unit === Unit.Celsius ? 'C' : 'F'}
      </Text>

      <Text style={styles.description}>{data.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  temp: {
    fontSize: 48,
    color: '#ff6f00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: '#ccc',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default WeatherCard;