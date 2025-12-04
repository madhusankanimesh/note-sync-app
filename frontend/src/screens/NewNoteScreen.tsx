import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import noteService from '@services/noteService';
import { Note } from '@types/index';

type NewNoteScreenProps = NativeStackScreenProps<RootStackParamList, 'NewNote'>;

const NewNoteScreen: React.FC<NewNoteScreenProps> = ({ navigation, route }) => {
  const existingNote = route.params?.note;
  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [lastSaved, setLastSaved] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingNote) {
      const date = new Date(existingNote.updated_at);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setLastSaved(`${formattedHours}:${formattedMinutes} ${ampm}`);
    }
  }, [existingNote]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Note', 'Please add a title or content to save the note.');
      return;
    }

    setSaving(true);
    try {
      if (existingNote) {
        // Update existing note
        await noteService.updateNote(existingNote.id, {
          title: title.trim(),
          content: content.trim(),
        });
        Alert.alert('Success', 'Note updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        // Create new note
        await noteService.createNote({
          title: title.trim(),
          content: content.trim(),
        });
        Alert.alert('Success', 'Note created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }

      // Update last saved time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setLastSaved(`${formattedHours}:${formattedMinutes} ${ampm}`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    const hasChanges = existingNote
      ? title !== existingNote.title || content !== existingNote.content
      : title.trim() || content.trim();

    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'Do you want to save your changes?',
        [
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Save',
            onPress: handleSave,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {existingNote ? 'Edit Note' : 'New Note'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title Input */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#cbd5e1"
            value={title}
            onChangeText={setTitle}
            multiline
          />

          {/* Content Input */}
          <TextInput
            style={styles.contentInput}
            placeholder="Your note starts here..."
            placeholderTextColor="#cbd5e1"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {lastSaved ? (
            <Text style={styles.lastSavedText}>Last saved: {lastSaved}</Text>
          ) : (
            <Text style={styles.lastSavedText}>Not saved yet</Text>
          )}
          
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.8}
          >
            {saving ? (
              <Text style={styles.saveButtonText}>Saving...</Text>
            ) : (
              <>
                <Text style={styles.saveIcon}>✓</Text>
                <Text style={styles.saveButtonText}>Save</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 36,
    color: '#0f172a',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '400',
    color: '#cbd5e1',
    marginBottom: 20,
    paddingVertical: 8,
  },
  contentInput: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    minHeight: 300,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  lastSavedText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveIcon: {
    fontSize: 20,
    color: '#ffffff',
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
});

export default NewNoteScreen;
