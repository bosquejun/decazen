
import { useUserContext } from "@/providers/user.provider";
import { ScrollShadow, Skeleton } from "@nextui-org/react";
import Show from "../common/Show";
import { CardAddParkingSpace } from "./card-parking-space";
import { CardRequiresOnboarding } from "./card-requires-onboarding";


export const SectionRentOutSpaces = () => {
    const { isAuthenticated } = useUserContext();



    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-foreground/70">Parking spaces</h1>
        <Show>
            <Show.When isTrue={isAuthenticated}>
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
            </Show.When>
            <Show.Else>
                <div className="flex md:flex-row flex-col gap-4">
                    {
                        [...new Array(3)].fill(0).map((_, i) => <Skeleton key={i} className="rounded-large min-h-[300px] min-w-[240px] md:w-0 w-full" />)
                    }
                </div>
            </Show.Else>
        </Show>
        {/* <div className="flex flex-col md:flex-row gap-4 overflow-hidden overflow-x-auto pb-4">
            
        </div> */}
    </div>
}