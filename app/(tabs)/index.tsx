import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchModal from '@/components/SearchModal';
import HamburgerMenu from '@/components/hamburgerMenu';

const BACKGROUND_COLOR = '#1e1e1e';

export default function Home() {
  const [foo, setFoo] = useState(true); // For design test
  const [modalVisible, setModalVisible] = useState(false);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const toggleUnit = () => {
    setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const handleSearch = (city: string) => {
    Alert.alert('Searching for', city);
    setModalVisible(false);
    setFoo(false); // Test
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <HamburgerMenu unit={unit} onToggleUnit={toggleUnit} />
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <Text style={styles.title}>DadWeather</Text>
        <Text style={styles.tagline}>Serious forecasts, seriously dad jokes.</Text>

        {foo && (
          <>
            <Image
              source={require('@/assets/images/app.png')}
              style={styles.appImage}
            />
            <Text style={styles.helperText}>
              Tap the <Ionicons name="location-sharp" size={18} color="#ccc" /> icon to get your current location, or search a city <Ionicons name="search-sharp" size={18} color="#ccc" />
            </Text>
          </>
        )}

        <View style={styles.dadJokeIndex}>
          <View style={styles.divider} />

          <Text style={styles.tagline}>
            "I told my wife she should embrace her mistakes. She gave me a hug..."
          </Text>

          <View style={styles.divider} />
        </View>

        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => console.log('Favorite pressed')}>
            <Ionicons name="heart-sharp" style={styles.favoriteIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Search pressed')}>
            <Ionicons name="search-sharp" style={styles.searchIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('GPS pressed')}>
            <Ionicons name="location-sharp" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <SearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
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
});