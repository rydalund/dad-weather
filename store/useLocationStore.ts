import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteLocation {
  city: string;
  lat: number;
  lon: number;
}

interface FavoritesState {
  favorites: FavoriteLocation[];

  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (city: string) => void;
  clearFavorites: () => void;
  isFavorite: (city: string) => boolean;
}

// 👇 AsyncStorage wrapper to match Zustand's expected storage interface
const zustandStorage: PersistStorage<FavoritesState> = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value == null) return null;
    try {
      return JSON.parse(value) as any;
    } catch {
      // fallback: return raw string if it wasn't JSON
      return value as any;
    }
  },
  setItem: async (key: string, value: any) => {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, v);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) => {
        const exists = get().favorites.some(
          (fav) => fav.city.toLowerCase() === location.city.toLowerCase()
        );
        if (!exists) {
          set((state) => ({
            favorites: [...state.favorites, location],
          }));
        }
      },

      removeFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav.city.toLowerCase() !== city.toLowerCase()
          ),
        })),

      clearFavorites: () => set({ favorites: [] }),

      isFavorite: (city) => {
        return get().favorites.some(
          (fav) => fav.city.toLowerCase() === city.toLowerCase()
        );
      },
    }),
    {
      name: 'favorites-storage',
      storage: zustandStorage,
    }
  )
);