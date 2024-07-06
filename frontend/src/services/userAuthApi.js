import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    csrftoken: builder.mutation({
      query: () => {
        return {
          url: "account/csrf_cookie/",
          method: "GET",
        };
      },
    }),
    register: builder.mutation({
      query: (user) => {
        return {
          url: "account/registration/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "account/login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    logoutUser: builder.mutation({
      query: (csrf_key) => {
        return {
          url: "account/logout/",
          method: "POST",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-type": "application/json",
          },
        };
      },
    }),

    userData: builder.query({
      query: (access_token) => {
        return {
          url: "account/userdetails/",
          method: "GET",
          headers: {
            'authorization': `Bearer ${access_token}`,
            
          },
          credentials: "include",
        };
      },
    }),

    registerreport: builder.mutation({
      query: (report) => {
        return {
          url: "account/userreport/",
          method: "POST",
          body: report,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    reportData: builder.query({
      query: (access_token) => {
        return {
          url: "account/userreport/",
          method: "GET",
          headers: {
            'authorization': `Bearer ${access_token}`,
            
          },
          credentials: "include",
        };
      },
    }),

    
  }),
});

export const {
  useRegisterMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUserDataQuery,
  useCsrftokenMutation,
  useRegisterreportMutation,
  useReportDataQuery
} = userAuthApi;
