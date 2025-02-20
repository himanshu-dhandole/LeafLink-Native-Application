// App.tsx
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import Home from './components/Home';
import Profile from './components/Profile';
import Jobs from './components/Jobs';
import Mentor from './components/Mentor';
import Chat from './components/Chat';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Session from './components/Session'; // Ensure this import is present

// Type definitions
type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type TabParamList = {
  Home: undefined;
  Jobs: undefined;
  Mentor: undefined;
  Profile: undefined;
  Chat: undefined;
};

enableScreens();

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Handle user logout
const handleLogout = async (navigation: any) => {
  try {
    await AsyncStorage.multiRemove(['userToken', 'userData']);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#111820' },
        animation: 'simple_push',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: '#111820',
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => handleLogout(navigation)}
            style={styles.headerButton}
          >
            <Icon name="sign-out" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: '#111820',
          borderTopColor: '#2A2A2A',
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="briefcase" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mentor"
        component={Mentor}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="users" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="comments" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      // Add a minimum delay to prevent flash of loading screen
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
        }}>
        {userToken ? (
          <RootStack.Screen name="Main" component={TabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111820',
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
  },
});

export default App;