import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Unit } from '@/constants/unit';

interface WeatherCardProps {
  lat: number;
  lon: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ lat, lon }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const { unit } = useSettingsStore();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const apiUnit = unit === Unit.Celsius ? 'metric' : 'imperial';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${apiKey}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Fel vid hämtning av väder:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, unit]);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  if (!weather || !weather.weather || !weather.main) {
    return <Text style={styles.errorText}>Kunde inte hämta väderdata</Text>;
  }

  const cityName = weather.name;
  const isFavorite = favorites.some(
    (fav) => fav.city.toLowerCase() === cityName.toLowerCase()
  );

  const toggleFavorite = () => {
    const location = {
      city: cityName,
      lat: lat,
      lon: lon,
    };

    if (isFavorite) {
      removeFavorite(cityName);
    } else {
      addFavorite(location);
    }
  };

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{cityName}</Text>
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
        {Math.round(weather.main.temp)}° {unit === Unit.Celsius ? 'C' : 'F'}
      </Text>

      <Text style={styles.description}>
        {weather.weather[0].description}
      </Text>
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