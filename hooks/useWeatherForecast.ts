import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Unit } from '@/constants/unit';
import { useSettingsStore } from '@/stores/useSettingsStore';

export interface ForecastDay {
  date: string;
  temp: string;
  description: string;
  icon: string;
}

export function useWeatherForecast(lat: number, lon: number) {
  const { unit } = useSettingsStore();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [locationName, setLocationName] = useState<string>(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;
        const apiUnit = unit === Unit.Celsius ? 'metric' : 'imperial';
        const tempUnit = unit === Unit.Celsius ? '°C' : '°F';

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Forecast fetch failed');
        }

        const json = await response.json();

        // Save location name from the response
        setLocationName(json.city?.name || 'Unknown location');

        // One entry per day
        const dailyMap: Record<string, ForecastDay> = {};

        json.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000).toISOString().split('T')[0];
          const hour = new Date(item.dt * 1000).getHours();

          if (!dailyMap[date] || hour === 12) {
            const roundedTemp = `${item.main.temp.toFixed(1)}\u00A0${tempUnit}`;

            dailyMap[date] = {
              date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }),
              temp: roundedTemp,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            };
          }
        });

        setForecast(Object.values(dailyMap).slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch forecast', err);
        setError('Failed to fetch forecast');
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon, unit]);

  return { forecast, locationName, loading, error };
}