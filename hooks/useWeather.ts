import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Unit } from '@/constants/unit';
import { useSettingsStore } from '@/stores/useSettingsStore';

interface WeatherData {
  name: string;
  temp: number;
  description: string;
  icon: string;
}

export function useWeather(lat: number, lon: number) {
  const { unit } = useSettingsStore();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;
        const apiUnit = unit === Unit.Celsius ? 'metric' : 'imperial';

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Weather fetch failed');
        }

        const json = await response.json();

        const parsed: WeatherData = {
          name: json.name,
          temp: json.main.temp,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
        };

        setData(parsed);
      } catch (error) {
        console.error('Failed to fetch weather', error);
        setError('Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, unit]);

  return { data, loading, error };
}