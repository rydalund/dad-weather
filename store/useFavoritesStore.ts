import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface FavoriteLocation {
  city: string;
  lat: number;
  lon: number;
}

interface FavoritesState {
  favorites: FavoriteLocation[];
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (city: string) => void;
  clearFavorites: () => void;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (location) => {
    const current = get().favorites;
    const exists = current.some(
      (fav) => fav.city.toLowerCase() === location.city.toLowerCase()
    );
    if (!exists) {
      const updated = [...current, location];
      set({ favorites: updated });
      AsyncStorage.setItem('favorites', JSON.stringify(updated));
    }
  },

  removeFavorite: (city) => {
    const updated = get().favorites.filter(
      (fav) => fav.city.toLowerCase() !== city.toLowerCase()
    );
    set({ favorites: updated });
    AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },

  clearFavorites: () => {
    set({ favorites: [] });
    AsyncStorage.removeItem('favorites');
  },

  loadFavorites: async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        const parsed: FavoriteLocation[] = JSON.parse(stored);
        set({ favorites: parsed });
      }
    } catch (error) {
      console.error('Failed to load favorites from storage', error);
    }
  },
}));