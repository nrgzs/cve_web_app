import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pathApi = createApi({
  reducerPath: 'pathApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }), // Replace with your backend URL
  endpoints: (builder) => ({
    getPaths: builder.query({
      query: () => '/path',
      providesTags:['path']
    }),
    addPath: builder.mutation({
      query: (newApp) => ({
        url: '/path',
        method: 'POST',
        body: newApp,
      }),
      invalidatesTags: ['path'],
    }),
    deletePath: builder.mutation({
      query: (id) => ({
        url: `/path/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['path'],
    }),
  }),
});

export const { useGetPathsQuery, useAddPathMutation, useDeletePathMutation } = pathApi;
