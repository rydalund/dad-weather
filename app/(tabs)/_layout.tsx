import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';

export default function TabLayout() {

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1e1e1e"
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ff6f00',
          tabBarInactiveTintColor: '#999',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
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
    </>
  );
}
