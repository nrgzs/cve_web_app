import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }), // Replace with your backend URL
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => '/status',
      providesTags:['status']
    }),
    
  }),
});

export const { useGetStatusQuery } = statusApi;
