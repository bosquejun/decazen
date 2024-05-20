import { loginRequest } from "@/api/login.api";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";


type AuthState = {
    isAuthenticated: boolean;
}

export type AuthContext = {

    login: (email: string, password: string) => Promise<void>;
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
    })
    const login = async (email: string, password: string) => {

        await promise(mutateAsync({
            email, password
        }), {
            loading: "Logging in...",
            success: "Logged in successfully",
            error: "Failed to login"
        });
        // setState({ isAuthenticated: true });
    };

    return (
        <AuthContext.Provider value={{ ...state, login }}>
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