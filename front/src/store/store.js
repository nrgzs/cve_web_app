import { configureStore } from '@reduxjs/toolkit';
import { appApi } from '../api/appApi.js';
import { pathApi } from '../api/pathApi.js';
import { cveApi } from '../api/cveApi.js';
import { statusApi } from '../api/statusApi.js';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [pathApi.reducerPath]: pathApi.reducer,
    [cveApi.reducerPath]: cveApi.reducer,
    [statusApi.reducerPath]: statusApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware, pathApi.middleware,cveApi.middleware, statusApi.middleware), 

});
