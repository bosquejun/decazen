"use client"

import { getProfile, loginRequest } from "@/api/login.api";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";


type UserData = {
    "id": string,
    "deleted_at": null,
    "role": string,
    "email": string,
    "first_name": string,
    "last_name": string | null,
    "api_token": string | null,
    "metadata": {
        "billing_info": null
    },
    "store_id": string | null,
    "status": "registered" | "active"
}

type AuthState = {
    // isAuthenticated: boolean;
}

export type AuthContext = {
    login: (email: string, password: string) => Promise<void>;
    userData?: UserData,
    hasStore: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
} & AuthState;

export const AuthContext = createContext<AuthContext | null>(null);


const initialState: AuthState = {
    isAuthenticated: false,
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { notify, promise } = useToast();

    const [state, setState] = useState<AuthState>(initialState);
    const { mutateAsync } = useMutation<unknown, unknown, { email: string, password: string }>({
        mutationFn: (body) => {
            return loginRequest(body.email, body.password);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        }
    });
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["user_profile"],

    })

    const login = async (email: string, password: string) => {

        await promise(mutateAsync({
            email, password
        }), {
            loading: "Logging in...",
            success: "Logged in successfully",
            error: "Failed to login"
        });
    };

    const userData = useMemo(() => {
        if (isLoading || isError || !data) {
            return undefined;
        }
        return data["user"] as UserData;
    }, [data, isLoading, isError]);

    return (
        <AuthContext.Provider value={{ ...state, login, userData, isAuthenticated: Boolean(userData), hasStore: Boolean(userData?.store_id), isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context as AuthContext;
}