"use client";
import { Toaster } from "@/components/ui/toaster";
import { API_BASE_URL } from "@/constants/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from "axios";
import React from "react";
const Provider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(() => new QueryClient())
  axios.defaults.baseURL = API_BASE_URL;
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Provider;
