import { configureStore } from '@reduxjs/toolkit';
import playfairReducer from '../features/playfair/playfairSlice';

export default configureStore({
  reducer: {
    playfair: playfairReducer
  },
});
