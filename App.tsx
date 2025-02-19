// filepath: /Users/arpitrameshsatpute/Desktop/native/androidApp/sampleAndroid/App.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import Jobs from './components/Jobs';
import Mentor from './components/Mentor';

enableScreens();

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111820',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="Mentor" component={Mentor} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
