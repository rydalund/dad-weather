import { Platform } from 'react-native';
import * as ExpoLocation from 'expo-location';
import type { Location as LocationType } from '@/stores/useLocationStore';

export async function getUserLocation(): Promise<LocationType | null> {
  try {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          console.warn('Geolocation not supported');
          resolve(null);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Return with placeholder metadata for mobile, will be replaced with actual data later, but needes for type consistency
            resolve({
              name: 'Current ocation',
              country: 'Unknown',
              lat: latitude,
              lon: longitude,
              displayName: 'Your location (Web)',
            });
          },
          (error) => {
            console.error('Error getting web location:', error);
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    } else {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location denied');
        return null;
      }

      const coords = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });

      const { latitude, longitude } = coords.coords;

      // Return with placeholder metadata for mobile, will be replaced with actual data later, but needes for type consistency
      return {
        name: 'Current ocation',
        country: 'Unknown',
        lat: latitude,
        lon: longitude,
        displayName: 'Current location (Device)',
      };
    }
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
}