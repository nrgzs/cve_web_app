import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cveApi = createApi({
  reducerPath: "cveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/api" }), // Replace with your backend URL
  endpoints: (builder) => ({
    getInitialCveDataByAppId: builder.mutation({
      query: (appId) => `/cve/getInitialCveData/${appId}`,
    }),
    getDynamicCveDataByAppId: builder.query({
      query: (appId) => `/cve/getDynamicCveData/${appId}`,
    }),
    getCveDataForAllApps: builder.mutation({
      query: () => `/cve/getCveDataForAllApps`,
    }),
    initializeFetch: builder.mutation({
      query: () => `/cve/initializeFetch`,
    }),
    stopInitializeFetchService: builder.mutation({
      query: () => `/cve/stopInitializeFetchService`,
    }),
  }),
});

export const {
  useGetInitialCveDataByAppIdMutation,
  useGetDynamicCveDataByAppIdQuery,
  useGetCveDataForAllAppsMutation,

  useInitializeFetchMutation,
  useStopInitializeFetchServiceMutation,
} = cveApi;
