import { createContext, useContext, useState } from "react";


type AuthState = {
    isAuthenticated: boolean;
}

export type AuthContext = {

    login: () => Promise<void>;
} & AuthState;

export const AuthContext = createContext<AuthContext | null>(null);


const initialState: AuthState = {
    isAuthenticated: false,
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AuthState>(initialState);
    const login = async () => {
        console.log("login");
        setState({ isAuthenticated: true });
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