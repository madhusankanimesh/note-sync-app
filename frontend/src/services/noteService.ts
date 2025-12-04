import api from './api';
import { Note, CreateNoteDto, UpdateNoteDto } from '@types/index';

class NoteService {
  async getNotes(page: number = 1): Promise<{ results: Note[]; count: number; next: string | null; previous: string | null }> {
    try {
      const response = await api.get(`/notes/?page=${page}`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getAllNotes(): Promise<Note[]> {
    try {
      const response = await api.get('/notes/?page_size=1000');
      return response.data.results || response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getNoteById(id: number): Promise<Note> {
    try {
      const response = await api.get(`/notes/${id}/`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async createNote(note: CreateNoteDto): Promise<Note> {
    try {
      const response = await api.post('/notes/', note);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async updateNote(id: number, note: UpdateNoteDto): Promise<Note> {
    try {
      const response = await api.patch(`/notes/${id}/`, note);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async deleteNote(id: number): Promise<void> {
    try {
      await api.delete(`/notes/${id}/`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message 
        || error.response.data?.error
        || error.response.data?.detail
        || 'An error occurred';
      
      return new Error(message);
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new NoteService();
