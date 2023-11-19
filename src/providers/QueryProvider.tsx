"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface ProviderProps {
    children: React.ReactNode;
}
const QueryProvider: React.FC<ProviderProps> = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
