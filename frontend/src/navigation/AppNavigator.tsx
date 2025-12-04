import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import NotesScreen from '@screens/NotesScreen';
import NewNoteScreen from '@screens/NewNoteScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Notes: undefined;
  NewNote: { note?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // TODO: Add authentication state management here
  // For now, we start with Login screen
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
        {/* App Screens */}
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NewNote" component={NewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
