import { configureStore } from '@reduxjs/toolkit';
import { appApi } from '../api/appApi.js';
import { pathApi } from '../api/pathApi.js';
import { cveApi } from '../api/cveApi.js';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [pathApi.reducerPath]: pathApi.reducer,
    [cveApi.reducerPath]: cveApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware, pathApi.middleware,cveApi.middleware), 

});
