import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useLocationStore } from '@/stores/useLocationStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const { setLocation } = useLocationStore();
  const router = useRouter();

  const handleSelect = (fav: any) => {
    setLocation({
      name: fav.city,
      country: '',
      lat: fav.lat,
      lon: fav.lon,
      displayName: fav.city,
    });
    router.back();
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity style={styles.cityButton} onPress={() => handleSelect(item)}>
        <Text style={styles.cityText}>{item.city}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => removeFavorite(item.city)}>
        <Ionicons name="close-circle" size={24} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Text style={styles.title}>Your Favorites: </Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.city}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    color: '#ff6f00',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    gap: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },
  cityButton: {
    flex: 1,
  },
  cityText: {
    color: '#fff',
    fontSize: 18,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 50,
  },
});