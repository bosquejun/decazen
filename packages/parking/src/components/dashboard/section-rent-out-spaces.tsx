import useUserContext from "@/hooks/use-user-context";
import { ScrollShadow } from "@nextui-org/react";
import { CardAddParkingSpace } from "./card-parking-space";
import { CardRequiresOnboarding } from "./card-requires-onboarding";


export const SectionRentOutSpaces = () => {
    const { requiresOnboarding, isAuthenticated } = useUserContext();

    if (!isAuthenticated) return null;



    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-foreground/70">Parking spaces</h1>
        <CardRequiresOnboarding>
            <ScrollShadow isEnabled={false} orientation="horizontal" className="md:hidden flex flex-col gap-4 pb-4" size={50}>
                <CardAddParkingSpace />
                {/* {
                [...new Array(5)].map((_, index) => <CardParkingSpace key={index} />)
            } */}
            </ScrollShadow>
            <ScrollShadow orientation="horizontal" className="hidden md:flex md:flex-row gap-4 pb-4" size={50}>
                <CardAddParkingSpace />
                {/* {
                [...new Array(5)].map((_, index) => <CardParkingSpace key={index} />)
            } */}
            </ScrollShadow>
        </CardRequiresOnboarding>
        {/* <div className="flex flex-col md:flex-row gap-4 overflow-hidden overflow-x-auto pb-4">
            
        </div> */}
    </div>
}