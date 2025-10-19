import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Modal,
    Text,
    StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function HamburgerMenu({}) {
    const [visible, setVisible] = useState(false);
     const unit = useSettingsStore(state => state.unit);
  const toggleUnit = useSettingsStore(state => state.toggleUnit);

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
            >
                <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.menu}>
                        <Text style={styles.menuTitle}>Settings</Text>

                        <TouchableOpacity onPress={toggleUnit} style={styles.menuItem}>
                            <Text style={styles.menuItemText}>
                                Change temp to {unit === 'celsius' ? '°F' : '°C'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.menuItem}>
                            <Text style={[styles.menuItemText, { color: '#aaa' }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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