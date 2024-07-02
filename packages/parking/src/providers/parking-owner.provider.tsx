import addParkingSpaceAction from "@/app/actions/parking/addParkingSpaceAction";
import { fetchStoreParkingSpaces } from "@/app/actions/parking/fetchStoreParkingSpaces";
import { AddParkingSpaceSchema } from "@/forms/schema/add-parking-space.schema";
import { ParkingSpace } from "@/types";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useUserContext } from "./user.provider";




type ParkingOwnerContext = {
    parkingSpaces: ParkingSpace[],
    parkingSpaceLoading: boolean;
    addNewParkingSpace: (parkingSpace: AddParkingSpaceSchema) => Promise<void>;
    parkingFetchLoaded: boolean;
}


type ParkingOwnerState = Omit<ParkingOwnerContext, "addNewParkingSpace">;


const initialState: ParkingOwnerState = {
    parkingSpaceLoading: false,
    parkingSpaces: [],
    parkingFetchLoaded: false,
}

const ParkingOwnerContext = createContext<ParkingOwnerContext | null>(null);


export const useParkingOwner = () => useContext(ParkingOwnerContext) as ParkingOwnerContext;


export default function ParkingOwnerProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading: isUserLoading } = useUserContext();
    const [state, setState] = useState<ParkingOwnerState>(initialState);


    const fetchParkingSpaces = useCallback(async () => {
        try {
            setState({
                ...state,
                parkingSpaceLoading: true,
                parkingFetchLoaded: false,
            })
            const response = await fetchStoreParkingSpaces();
            setState({
                ...state,
                parkingSpaceLoading: false,
                parkingSpaces: response.parkingSpaces,
                parkingFetchLoaded: true,
            })
        } catch (error) {
            setState({
                ...state,
                parkingSpaceLoading: false,
                parkingFetchLoaded: true,
            })
        }
    }, []);

    const addNewParkingSpace = useCallback(async (parkingSpace: AddParkingSpaceSchema) => {
        const { generalInformation, rentalInformation, } = parkingSpace;

        // const formData = Object.keys(media).reduce((form, key) => {
        //     form.append(key, media[key as keyof typeof media] as File);
        //     return form;
        // }, new FormData());

        await addParkingSpaceAction({ ...generalInformation, ...rentalInformation }, new FormData());
        await fetchParkingSpaces();
    }, [])


    useEffect(() => {
        if (!isAuthenticated || isUserLoading || state.parkingSpaceLoading) return;
        fetchParkingSpaces();

    }, [isAuthenticated, isUserLoading]);


    const value: ParkingOwnerContext = {
        ...state,
        addNewParkingSpace,
    }


    console.log(state.parkingSpaces)

    return <ParkingOwnerContext.Provider value={value}>
        {children}
    </ParkingOwnerContext.Provider>
}