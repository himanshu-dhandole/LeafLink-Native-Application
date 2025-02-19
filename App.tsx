import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import Jobs from './components/Jobs';
import Mentor from './components/Mentor';
enableScreens();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#111820',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                marginRight: 25,
              }}
            />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: '#111820',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: 15, color}}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: 15, color}}>🤵🏼</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Mentor"
        component={Mentor}
        options={{
          tabBarLabel: 'Mentor',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: 15, color}}>👨🏼‍🏫</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: 15, color}}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
