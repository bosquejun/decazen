"use client"

import { getProfileAction } from "@/app/actions/user/getProfileAction";
import { UserData } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";




type UserState = {
    userData?: UserData | null;
    isUserDataFetched: boolean;
}


export type UserContext = UserState & {
    session: ReturnType<typeof useSession>,
    isAuthenticated: boolean;
    isLoading: boolean;
    hasStore: boolean;
    requiresOnboarding: boolean;
    fetchUserProfile: () => Promise<void>
};


export const UserContext = createContext<UserContext | null>(null);

const initialState: UserState = {
    isUserDataFetched: false,
    userData: null
}


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const [state, setState] = useState<UserState>(initialState);

    useEffect(() => {
        if (session.status === 'authenticated' && !state.isUserDataFetched) {
            fetchUserProfile();
        }
    }, [session, state.isUserDataFetched]);

    const fetchUserProfile = useCallback(async () => {
        if (session.status !== 'authenticated') return;
        const response = await getProfileAction(session.data?.access_token);
        setState({
            isUserDataFetched: true,
            userData: response
        })
    }, [session?.data]);


    const value: UserContext = {
        session,
        isAuthenticated:
            session.status === 'authenticated' &&
            Boolean(session?.data) &&
            state.isUserDataFetched,
        isLoading: session.status === 'loading' && !state.isUserDataFetched,
        hasStore: Boolean(state.userData?.store_id),
        requiresOnboarding: state.userData?.status === 'registered',
        fetchUserProfile,
        ...state,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );

}

export const useUserContext = () => {
    const context = useContext<UserContext | null>(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within an UserProvider");
    }
    return context as UserContext;
}