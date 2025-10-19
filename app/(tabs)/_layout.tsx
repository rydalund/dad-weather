import React from 'react';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#999',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color}  />,
        }}
      />
        <Tabs.Screen
        name="dadJokes"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="male" size={24} color={color} style={{ marginTop: 3 }} />,
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="partly-sunny" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
