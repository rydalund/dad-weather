import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
    displayName: string;
  }) => void;
}

export default function SearchModal({ visible, onClose, onSelectLocation }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;

   const fetchLocations = async () => {
    if (query.trim().length < 2) return;
    setLoading(true);
    setNoResults(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setNoResults(true);
        setResults([]);
        return;
      }

      const formatted = data.map((item: any) => ({
        ...item,
        displayName: `${item.name}${item.state ? `, ${item.state}` : ''} (${item.country})`,
      }));

      setResults(formatted);
    } catch (error) {
      console.error('Error fetching city data:', error);
      setNoResults(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: any) => {
    onSelectLocation({
      name: item.name,
      country: item.country ?? 'N/A',
      state: item.state,
      lat: item.lat,
      lon: item.lon,
      displayName: item.displayName,
    });
    setQuery('');
    setResults([]);
    setNoResults(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Search location</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={fetchLocations}
          />

          {loading && <ActivityIndicator color="#ff6f00" style={{ marginVertical: 10 }} />}

           {noResults && (
            <Text style={styles.noResultsText}>
              No location with "{query}" was found — please try again.
            </Text>
          )}

          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.resultItem} onPress={() => handleSelect(item)}>
                <Text style={styles.resultText}>{item.displayName}</Text>
              </Pressable>
            )}
          />

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.searchButton]} onPress={fetchLocations}>
              <Text style={styles.buttonText}>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: '80%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultItem: {
    paddingVertical: 10,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
   noResultsText: {
    color: '#ffb74d',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#ff6f00',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});