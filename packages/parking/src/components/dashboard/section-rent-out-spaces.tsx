import { CardAddParkingSpace } from "./card-parking-space"


export const SectionRentOutSpaces = () => {


    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-foreground/70">Rent out Parking Spaces</h1>
        <div className="flex gap-6">
            <CardAddParkingSpace />
        </div>
    </div>
}