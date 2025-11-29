import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de connexion');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      // Gestion améliorée des erreurs
      console.error('Erreur inscription:', error);
      
      // Erreur avec réponse du serveur
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            'Erreur lors de l\'inscription';
        const errorDetails = error.response.data;
        
        console.error('Détails erreur serveur:', errorDetails);
        return rejectWithValue({
          message: errorMessage,
          details: errorDetails,
          status: error.response.status
        });
      }
      
      // Erreur réseau (pas de réponse)
      if (error.request) {
        console.error('Pas de réponse du serveur');
        return rejectWithValue({
          message: 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.',
          networkError: true
        });
      }
      
      // Autre erreur
      return rejectWithValue({
        message: error.message || 'Erreur lors de l\'inscription',
        error: error.message
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        // Gérer les erreurs sous forme d'objet ou de string
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else if (action.payload?.message) {
          state.error = action.payload.message;
        } else {
          state.error = 'Erreur lors de l\'inscription';
        }
        console.error('Register rejected:', action.payload);
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;