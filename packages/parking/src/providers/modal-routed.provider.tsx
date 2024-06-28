import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';


export enum SUPPORTED_MODAL_ROUTE {
    ONBOARDING = "onboarding",
    ADD_PARKING_SPACE = "add-parking"
}

const ModalRoutedContext = createContext({
    isModalRoutedOpen: false,
    openModalRouted: (modalName: SUPPORTED_MODAL_ROUTE) => {
        //
    },
    closeModalRouted: () => {
        //
    },
});

export const useModalRouted = () => useContext(ModalRoutedContext);

export const ModalRoutedProvider = ({ children }: { children: ReactNode }) => {
    const [modalName, setModalName] = useState<SUPPORTED_MODAL_ROUTE | undefined>(undefined);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const currentModal = searchParams.get("modal") as SUPPORTED_MODAL_ROUTE;

        if (Object.values(SUPPORTED_MODAL_ROUTE).includes(currentModal)) {
            openModalRouted(currentModal);
        }
    }, [searchParams.get("modal")]);

    const addModalParam = (_modalName: string) => {
        const url = new URL(window.location.href);
        const existingModalValue = url.searchParams.get('modal');
        if (existingModalValue !== _modalName) {
            url.searchParams.set('modal', _modalName); // Use set to ensure uniqueness
            router.push(url.toString());
        }
    };

    const removeModalParam = () => {
        const url = new URL(window.location.href);
        if (url.searchParams.has('modal')) {
            url.searchParams.delete('modal');
        }
        router.push(url.toString());
    };

    const openModalRouted = (modalName: SUPPORTED_MODAL_ROUTE) => {
        addModalParam(modalName);
        setModalName(modalName);
    }

    const closeModalRouted = () => {
        removeModalParam();
        setModalName(undefined);
    }

    return (
        <ModalRoutedContext.Provider value={{ isModalRoutedOpen: Boolean(modalName), openModalRouted, closeModalRouted }}>
            {children}
        </ModalRoutedContext.Provider>
    );
};