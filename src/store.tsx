import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './reducer/accessTokenSlice';
import userReducer from './reducer/userSlice'

export default configureStore({
    reducer: {
      accessToken: accessTokenReducer,
      user: userReducer
  }
})