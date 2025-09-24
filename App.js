import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './components/HomeScreen';
import CategoryScreen from './components/CategoryScreen';
import GameScreen from './components/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Hangman Home" }} 
        />
        <Stack.Screen 
          name="Categories" 
          component={CategoryScreen} 
          options={{ title: "Choose Category" }} 
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{ title: "Play Hangman" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
