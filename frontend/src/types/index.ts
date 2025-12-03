// User types
export interface User {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
}

// Note types
export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// API Response types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
