import { configureStore } from '@reduxjs/toolkit';
import { appApi } from '../api/appApi.js';
import { pathApi } from '../api/pathApi.js';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [pathApi.reducerPath]: pathApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware, pathApi.middleware), 

});
