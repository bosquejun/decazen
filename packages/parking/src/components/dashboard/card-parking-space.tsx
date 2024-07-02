"use client"

import { SUPPORTED_MODAL_ROUTE, useModalRouted } from "@/providers/modal-routed.provider";
import { ParkingSpace, ProductPrice } from "@/types";
import { getPriceValue } from "@/utils/numerals";
import { Card, CardBody, Chip } from "@nextui-org/react";
import clsx from 'clsx';
import { Add } from "iconsax-react";
import moment from "moment";
import Image from "next/image";
import { AddParkingSpaceModal } from "../modals/addParkingSpaceModal";

export const CardAddParkingSpace = () => {

    const { closeModalRouted, isModalRoutedOpen, openModalRouted } = useModalRouted(SUPPORTED_MODAL_ROUTE.ADD_PARKING_SPACE);
    return (
        <>
            <Card className="shadow-none active:scale-95 cursor-pointer hover:border-primary/70 border-2 border-dashed border-foreground-300 min-h-[300px] min-w-[240px] md:w-0 w-full">
                <CardBody onClick={openModalRouted} className="h-full" >
                    <div className="flex items-center justify-center h-full">
                        <Add size="60" className="text-primary-500  dark:text-primary" />
                    </div>
                </CardBody>
            </Card>
            <AddParkingSpaceModal isOpen={isModalRoutedOpen} onClose={closeModalRouted} />
        </>
    )
}

type CardParkingSpaceProps = {
    parkingSpace: ParkingSpace;
}

export const CardParkingSpace = ({ parkingSpace }: CardParkingSpaceProps) => {


    return (
        <Card className="shadow-none active:scale-95 cursor-pointer border-2 border-transparent hover:border-primary/70 min-h-[300px] min-w-[240px] md:w-0 w-full">
            <CardBody>
                <div className="flex flex-col gap-y-2 h-full overflow-hidden">

                    <div className="flex justify-between">
                        <p className="text-md text-foreground-400">{moment(parkingSpace.created_at).format("MMM DD, yyyy")}</p>
                        <Chip className={clsx("rounded-lg bg-background capitalize", {
                            'text-success': parkingSpace.status === 'publish',
                            'text-default-500': parkingSpace.status === 'draft',
                        })}>{parkingSpace.status}ed</Chip>
                    </div>

                    <div className="w-full h-[220px] md:h-[150px] bg-content2 rounded-lg flex items-center justify-center overflow-hidden mt-2">
                        <Image
                            alt="image"
                            className={clsx(
                                "rounded-lg h-full w-full object-contain scale-[1.5] object-[10% 30%]",
                            )}
                            width="1000"
                            height="1000"
                            src={parkingSpace.product?.type.value === 'car' ? '/images/car-placeholder.jpg' : '/images/motorcycle-placeholder.jpg'}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold capitalize">{parkingSpace.product?.type.value} parking</p>
                        <div className="flex">
                            <p className="text-lg font-medium text-primary-400 dark:text-primary">{getPriceValue(parkingSpace.product?.variants[0].prices[0] as ProductPrice)} / Daily</p>
                        </div>
                    </div>


                    <div className="flex">
                        <Chip variant="bordered" className="rounded-lg bg-transparent text-foreground-400 capitalize">{parkingSpace.area_type.split("-").join(" ")}</Chip>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}