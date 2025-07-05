import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./endpoints";

// Configure fetchBaseQuery to send cookies
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // ✅ Required for sending cookies
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api", // Optional
  baseQuery,
  tagTypes: ["User", "Income", "Expense"], // ✅ Optional: Helps with cache invalidation
  endpoints: () => ({}),
});
