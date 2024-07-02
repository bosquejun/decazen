
import { useParkingOwner } from "@/providers/parking-owner.provider";
import { useUserContext } from "@/providers/user.provider";
import { Link, ScrollShadow, Skeleton } from "@nextui-org/react";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import Show from "../common/Show";
import { Icon } from "../icons/Icon";
import { CardAddParkingSpace, CardParkingSpace } from "./card-parking-space";
import { CardRequiresOnboarding } from "./card-requires-onboarding";


export const SectionRentOutSpaces = () => {
    const { isAuthenticated, isLoading } = useUserContext();
    const { parkingSpaces, parkingSpaceLoading, parkingFetchLoaded } = useParkingOwner();

    const renderCards = (orientation: "horizontal" | "vertical") => <>
        <CardAddParkingSpace />
        {
            parkingSpaces.slice(0, 5).map((parkingSpace, index) => <CardParkingSpace parkingSpace={parkingSpace} key={index} />)
        }
        <div className="flex h-full justify-center items-center ">
            <Link className="cursor-pointer">
                <p className="text-small text-primary-500 dark:text-primary ">View More</p>
                <Show>
                    <Show.When isTrue={orientation === "horizontal"}>
                        <Icon as={ArrowRight2} className="text-primary-500 dark:text-primary" />
                    </Show.When>
                    <Show.Else>
                        <Icon as={ArrowDown2} className="text-primary-500 dark:text-primary" />
                    </Show.Else>
                </Show>
            </Link>
        </div>
    </>

    if (!parkingSpaceLoading && !isAuthenticated && !isLoading && parkingFetchLoaded) return null;

    return <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground/70">Parking spaces</h1>
        <Show>
            <Show.When isTrue={parkingFetchLoaded}>
                <CardRequiresOnboarding classNames={{
                    onboardedContent: "flex"
                }}>
                    <ScrollShadow isEnabled={false} className="w-full content-scrollable md:hidden grid sm:grid-cols-2 gap-4 pb-4" size={50}>
                        {renderCards("vertical")}
                    </ScrollShadow>
                    <ScrollShadow orientation="horizontal" className="w-full content-scrollable hidden md:flex md:flex-row gap-4 pb-4" size={50}>
                        {renderCards("horizontal")}
                    </ScrollShadow>
                </CardRequiresOnboarding>
            </Show.When>
            <Show.Else>
                <ScrollShadow hideScrollBar={true} orientation="horizontal" className="hidden w-full md:flex gap-4 pb-4" size={50}>
                    {
                        [...new Array(5)].fill(0).map((_, i) => <Skeleton key={i} className="rounded-large min-h-[300px] min-w-[240px] md:w-0 w-full" />)
                    }
                </ScrollShadow>
                <div className="w-full flex flex-col md:hidden gap-4 pb-4 max-h-[800px] overflow-hidden" >
                    {
                        [...new Array(5)].fill(0).map((_, i) => <Skeleton key={i} className="rounded-large min-h-[300px] min-w-[240px] md:w-0 w-full" />)
                    }
                </div>

            </Show.Else>
        </Show>
    </div>
}