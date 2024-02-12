import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './signup.slice';
import authReducer from './login.slice'
import homeReducer from './Home.slice'

export default configureStore({
  reducer: {
    register: registerReducer,
   auth : authReducer,
   home : homeReducer
  },
});