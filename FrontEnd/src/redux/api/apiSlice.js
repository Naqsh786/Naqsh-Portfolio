import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("naqsh-admin-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project", "Auth", "Profile"],
  endpoints: (builder) => ({
    // Projects Endpoints
    getProjects: builder.query({
      query: () => "/api/projects",
      providesTags: ["Project"],
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: "/api/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/api/projects/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    // Profile Endpoints
    getProfile: builder.query({
      query: () => "/api/profile",
      providesTags: ["Profile"],
      transformResponse: (response) => response.data,
    }),
    updateProfileData: builder.mutation({
      query: (profileData) => ({
        url: "/api/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Auth Endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileDataMutation,
} = apiSlice;
