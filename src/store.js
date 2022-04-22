import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './reducer/accessTokenSlice';

export default configureStore({
    reducer: {
      accessToken: accessTokenReducer,
  }
})