import { StatusBar, StyleSheet, Image } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const BACKGROUND_COLOR = '#1e1e1e';

export default function TabOneScreen() {
  return (
<SafeAreaView style={styles.safeArea} edges={['bottom']}>
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
      <Text style={styles.title}>DadWeather</Text>
      <Text style={styles.tagline}>Serious forecasts, seriously dad jokes.</Text>
      <Image
        source={require('@/assets/images/app.png')}
        style={styles.appImage}
      />
      <Text style={[styles.gpsPresentTemperature, styles.sharedStyling]}>30
        <Text style={[styles.gpsPresentTemperature, styles.sharedStyling]}>°C</Text>
      </Text>
      <Text style={[styles.gpsPresentLocation, styles.sharedStyling]}>📍 Växjö</Text>
      <Text style={[styles.tagline, styles.dadJokeIndex]}>"I told my wife she should embrace her mistakes. She gave me a hug..."</Text>
      <View style={styles.iconBar}>
        <Ionicons name="heart-sharp" style={styles.favoriteIcon} />
        <Ionicons name="search-sharp" style={styles.searchIcon} />
      </View>
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
  sharedStyling: {
    marginTop: 10,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  gpsPresentTemperature: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold'
  },
  gpsPresentLocation: {
    fontSize: 24,
    color: 'gray',
    marginBottom: 40,
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
  dadJokeIndex: {
    marginTop: 20,
    marginBottom: 50,
  }
});