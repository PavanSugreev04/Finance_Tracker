import { apiSlice } from "../apiSlice";
import { USERS_URL } from "../endpoints";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ for session cookie
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/send-otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ required to store cookie
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "DELETE", // ✅ must be DELETE
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        credentials: "include", // ✅ for protected route
      }),
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "PUT",
        body: data,
        credentials: "include", // ✅ to authenticate update
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: "PUT",
        body: data,
        credentials: "include", // ✅ if protected
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} = userApiSlice;
