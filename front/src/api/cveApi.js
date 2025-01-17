import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cveApi = createApi({
  reducerPath: "cveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/api" }), // Replace with your backend URL
  endpoints: (builder) => ({
    getAllCvesFromLocal: builder.query({
      query: () => "/cve",
      providesTags: ["cve"],
    }),
    getInitialCveDataByAppId: builder.mutation({
      query: (appId) => `/cve/getInitialCveData/${appId}`,
      invalidatesTags: ["cve"],
    }),
    getDynamicCveDataByAppId: builder.query({
      query: (appId) => `/cve/getDynamicCveData/${appId}`,
      invalidatesTags: ["cve"],
    }),
    getCveDataForAllApps: builder.mutation({
      query: () => `/cve/getCveDataForAllApps`,
      invalidatesTags: ["cve"],
    }),
    initializeFetch: builder.mutation({
      query: () => `/cve/initializeFetch`,
      invalidatesTags: ["cve"],
    }),
    stopInitializeFetchService: builder.mutation({
      query: () => `/cve/stopInitializeFetchService`,
      invalidatesTags: ["cve"],
    }),
  }),
});

export const {
  useGetInitialCveDataByAppIdMutation,
  useGetDynamicCveDataByAppIdQuery,
  useGetCveDataForAllAppsMutation,
  useGetAllCvesFromLocalQuery,
  useInitializeFetchMutation,
  useStopInitializeFetchServiceMutation,
} = cveApi;
