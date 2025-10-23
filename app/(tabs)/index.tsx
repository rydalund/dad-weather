import HamburgerMenu from '@/components/hamburgerMenu';
import SearchModal from '@/components/searchModal';
import WeatherCard from '@/components/weatherCard';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useLocationStore } from '@/stores/useLocationStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserLocation } from '@/utils/getUserLocation';
import { useRouter } from 'expo-router';

const BACKGROUND_COLOR = '#1e1e1e';

/*const mockedWeather = {
  city: 'Växjö',
  temperature: 10,
  description: 'Broken clouds',
  icon: '04d',
};*/

export default function Home() {
  //const [foo, setFoo] = useState(false); // For design test
  const [modalVisible, setModalVisible] = useState(false);
  const { location, setLocation } = useLocationStore();
  const { loadFavorites } = useFavoritesStore();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const router = useRouter();
  //const hasLocation = location !== null;

  /*const handleSearch = (city: string) => {
    console.log('Search:', city);
    setModalVisible(false);
  };*/

  useEffect(() => {
    loadFavorites();
  }, []);


  //For test
  useEffect(() => {
    console.log('Location updated:', location);
  }, [location]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <HamburgerMenu />
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <Text style={styles.title}>DadWeather</Text>
        <Text style={styles.tagline}>Serious forecasts, seriously dad jokes.</Text>

        {/* Show if location is not choosen */}
        {!location ? (
          <>
            <Image
              source={require('@/assets/images/app.png')}
              style={styles.appImage}
            />
            <Text style={styles.helperText}>
              Tap the <Ionicons name="location-sharp" size={18} color="#ccc" /> icon to get your current location, or search a city <Ionicons name="search-sharp" size={18} color="#ccc" />
            </Text>
          </>
        ) : (
          <WeatherCard
            lat={location.lat}
            lon={location.lon}
          />
        )}


        <View style={styles.dadJokeIndex}>
          <View style={styles.divider} />

          <Text style={styles.tagline}>
            "I told my wife she should embrace her mistakes. She gave me a hug..."
          </Text>

          <View style={styles.divider} />
        </View>

        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => router.push('/favorites')}>
            <Ionicons name="heart-sharp" style={styles.favoriteIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="search-sharp" style={styles.searchIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              try {
                setLoadingLocation(true);
                const gpsLocation = await getUserLocation();
                if (gpsLocation) {
                  setLocation(gpsLocation);
                } else {
                  Alert.alert('Location unavailable', 'Could not get your current position.');
                }
              } catch (error) {
                console.error('Failed to get location:', error);
              } finally {
                setLoadingLocation(false);
              }
            }}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator size="large" color="#ff6f00" />
            ) : (
              <Ionicons name="location-sharp" style={styles.searchIcon} />
            )}
          </TouchableOpacity>
        </View>

        <SearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectLocation={(selectedLocation) => {
            setLocation(selectedLocation);
            setModalVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff6f00',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#cccccc',
    textAlign: 'center',
    maxWidth: 300,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  helperText: {
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 300,
    fontSize: 16,
    flexDirection: 'row',
  },
  weatherText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#444',
    marginVertical: 20,
  },
  dadJokeIndex: {
    marginTop: 40,
    marginBottom: 50,
  },
  iconBar: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 36,
    color: '#ffffff',
  },
  favoriteIcon: {
    fontSize: 36,
    color: '#ff0000',
  },
  weatherCity: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginTop: 20,
  },
  weatherTemp: {
    fontSize: 52,
    color: '#ff6f00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  weatherDesc: {
    fontSize: 18,
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
});