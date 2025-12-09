"use client";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface TanstackProviderProps {
  children: React.ReactNode;
}
const clientOptions: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      onError(err) {
        toast.error(err.message);
      },
    },
  },
};
const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient(clientOptions));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { TanstackProvider };
