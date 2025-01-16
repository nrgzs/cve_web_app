import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }), // Replace with your backend URL
  endpoints: (builder) => ({
    getApps: builder.query({
      query: () => '/app',
    }),
    addApp: builder.mutation({
      query: (newApp) => ({
        url: '/app',
        method: 'POST',
        body: newApp,
      }),
    }),
    deleteApp: builder.mutation({
      query: (id) => ({
        url: `/app/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAppsQuery, useAddAppMutation, useDeleteAppMutation } = appApi;
