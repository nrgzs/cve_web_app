import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cveApi = createApi({
  reducerPath: "cveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/api" }), // Replace with your backend URL
  endpoints: (builder) => ({
    getInitialCveDataByAppId: builder.query({
      query: (appId) => `/getInitialCveData/${appId}`,
    }),
    getDynamicCveDataByAppId: builder.query({
      query: (appId) => `/getDynamicCveData/${appId}`,
    }),
    getCveDataForAllApps: builder.query({
      query: () => `/getCveDataForAllApps`,
    }),
    initializeFetch: builder.query({
      query: () => `/initializeFetch`,
    }),
    stopInitializeFetchService: builder.query({
      query: () => `/stopInitializeFetchService`,
    }),
  }),
});

export const {
  useGetInitialCveDataByAppIdQuery,
  useGetDynamicCveDataByAppIdQuery,
  useGetCveDataForAllAppsQuery,

  useInitializeFetchQuery,
  useStopInitializeFetchServiceQuery,
} = cveApi;
