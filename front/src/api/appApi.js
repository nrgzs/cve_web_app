import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }), // Replace with your backend URL
  endpoints: (builder) => ({
    getApps: builder.query({
      query: () => '/app',
      providesTags:['app']

    }),
    addApp: builder.mutation({
      query: (newApp) => ({
        url: '/app',
        method: 'POST',
        body: newApp,
      }),
      invalidatesTags: ['app'],
    }),
    deleteApp: builder.mutation({
      query: (id) => ({
        url: `/app/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['app'],
    }),
  }),
});

export const { useGetAppsQuery, useAddAppMutation, useDeleteAppMutation } = appApi;
