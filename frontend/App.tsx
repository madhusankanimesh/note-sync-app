import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📝 Note Sync App</Text>
          <Text style={styles.headerSubtitle}>Setup Confirmation Dashboard</Text>
        </View>

        {/* Status Cards */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ React Native Status</Text>
          <Text style={styles.cardContent}>Running successfully!</Text>
          <Text style={styles.cardDetail}>Platform: {Platform.OS}</Text>
          <Text style={styles.cardDetail}>Version: {Platform.Version}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Expo Status</Text>
          <Text style={styles.cardContent}>Expo Go is working!</Text>
          <Text style={styles.cardDetail}>TypeScript enabled</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Installed Packages</Text>
          <Text style={styles.packageItem}>• React Navigation</Text>
          <Text style={styles.packageItem}>• Axios (API calls)</Text>
          <Text style={styles.packageItem}>• AsyncStorage</Text>
          <Text style={styles.packageItem}>• Gesture Handler</Text>
          <Text style={styles.packageItem}>• Reanimated</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Next Steps</Text>
          <Text style={styles.stepItem}>1. Backend API integration</Text>
          <Text style={styles.stepItem}>2. Authentication screens</Text>
          <Text style={styles.stepItem}>3. Notes management UI</Text>
          <Text style={styles.stepItem}>4. Offline sync capability</Text>
        </View>

        {/* Test Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🚀 Setup Complete!</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Environment: {__DEV__ ? 'Development' : 'Production'}</Text>
          <Text style={styles.footerText}>Ready to build! 🎉</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  cardContent: {
    fontSize: 16,
    color: '#10b981',
    marginBottom: 8,
    fontWeight: '500',
  },
  cardDetail: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  packageItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginVertical: 4,
    paddingLeft: 8,
  },
  stepItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginVertical: 4,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
    marginVertical: 2,
  },
});
