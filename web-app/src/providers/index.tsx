'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./auth";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();


const Providers = ({ children }: { children: React.ReactNode }) => {


    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers;