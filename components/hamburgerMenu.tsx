import { Unit } from '@/constants/unit';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useLocationStore } from '@/stores/useLocationStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function HamburgerMenu() {
    const [visible, setVisible] = useState(false);
    const router = useRouter(); 
    const unit = useSettingsStore(state => state.unit);
    const toggleUnit = useSettingsStore(state => state.toggleUnit);
    const clearFavorites = useFavoritesStore(state => state.clearFavorites);
    const clearLocation = useLocationStore(state => state.clearLocation);

    const handleClearFavorites = () => {
        Alert.alert(
            'Clear Favorites',
            'Do you really want to remove all favorites?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        clearFavorites();
                        setVisible(false);
                        router.push('/');
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleClearLocation = () => {
        Alert.alert(
            'Clear Location',
            'Do you really want to clear current location?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        clearLocation();
                        setVisible(false);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.menu}>
                                <Text style={styles.menuTitle}>Settings</Text>

                                <TouchableOpacity onPress={toggleUnit} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>
                                        Change temp to {unit === Unit.Celsius ? '°F (Fahrenheit)' : '°C (Celsius)'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleClearLocation} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Clear location</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleClearFavorites} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Empty favorites</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setVisible(false)} style={styles.menuItem}>
                                    <Text style={[styles.menuItemText, { color: '#aaa' }]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menu: {
        backgroundColor: '#2a2a2a',
        padding: 16,
        borderBottomLeftRadius: 10,
        marginTop: 60,
        marginRight: 10,
        minWidth: 180,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuItemText: {
        fontSize: 16,
        color: '#ff6f00',
    },
});