import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppNavigator from '@navigation/AppNavigator';
import { AuthProvider } from '@context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
