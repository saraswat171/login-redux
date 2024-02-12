import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserData = createAsyncThunk(
  'home/fetchUserData',
  async (_, { rejectWithValue, getState }) => {
    try {
      
      const token = getState().auth.token;
      
    
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

     
      const response = await axios.get('http://localhost:8080/userData', config);
    
      return response.data.user; 
      
    } catch (error) {
     
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  userData: {}, 
  loading: false, 
  error: null, 
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true; 
      state.error = null; 
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false; 
      state.userData = action.payload; 
  
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.payload; 
    });
  },
});


export default homeSlice.reducer;
