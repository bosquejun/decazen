import { ScrollShadow } from "@nextui-org/react"
import { CardAddParkingSpace, CardParkingSpace } from "./card-parking-space"


export const SectionRentOutSpaces = () => {


    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-foreground/70">Rent out Parking Spaces</h1>
        <ScrollShadow isEnabled={false} orientation="horizontal" className="md:hidden flex flex-col gap-4 pb-4" size={50}>
            <CardAddParkingSpace />
            {
                [...new Array(5)].map((_, index) => <CardParkingSpace key={index} />)
            }
        </ScrollShadow>
        <ScrollShadow orientation="horizontal" className="hidden md:flex md:flex-row gap-4 pb-4" size={50}>
            <CardAddParkingSpace />
            {/* {
                [...new Array(5)].map((_, index) => <CardParkingSpace key={index} />)
            } */}
        </ScrollShadow>
        {/* <div className="flex flex-col md:flex-row gap-4 overflow-hidden overflow-x-auto pb-4">
            
        </div> */}
    </div>
}