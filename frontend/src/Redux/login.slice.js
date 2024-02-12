import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
async ({ email, password },{rejectWithValue}) => {
  console.log('email, password: ', email, password);
  try{
    const response = await axios.post('http://localhost:8080/logininfo', {  email, password });
    
  console.log('response redux' , response.data)
  localStorage.setItem('logged', 'true'); // Store logged state in local storage
      localStorage.setItem('token', response.data.token); 
  return response.data;
  }
  catch(err){
    console.log('error',err)
    return rejectWithValue(err.message);
  }
}
);
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
  try{
    console.log('logout')
    localStorage.removeItem('logged'); // Remove logged state from local storage
    localStorage.removeItem('token');
   const response= await axios.post('http://localhost:8080/logout');
    return response.data;
  }
  catch(err){
    return (err.message);
  }
  }
);
const initialState = {
  user: null,
  error: null,
  loading: false,
  logged: localStorage.getItem('logged') === 'true',
  token: localStorage.getItem('token'),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
    
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.logged=false;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
          state.loading = false;
          state.user = action.payload.user;
         state.logged=true;
         console.log('state', state.logged)
         state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
      state.error = action.payload;
      console.log('error payload' , action.payload)
      state.logged = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.logged = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.logged = false;
          state.token =null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('error logout' , state.error)
          state.logged = true;
        });
  
  },
});


export default authSlice.reducer;