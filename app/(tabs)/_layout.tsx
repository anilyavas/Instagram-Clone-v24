import { Redirect, Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href='/(auth)' />;
  }
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
          title: 'Create Post',
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
