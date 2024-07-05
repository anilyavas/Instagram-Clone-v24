import { Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'For you',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='plus-square-o' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='user' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
