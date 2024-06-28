"use client"

import { SUPPORTED_MODAL_ROUTE, useModalRouted } from "@/providers/modal-routed.provider";
import { Card, CardBody } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { AddParkingSpaceModal } from "../modals/addParkingSpaceModal";

export const CardAddParkingSpace = () => {

    const { closeModalRouted, isModalRoutedOpen, openModalRouted } = useModalRouted();
    return (
        <>
            <Card className="shadow-none active:scale-95 cursor-pointer hover:border-primary/70 border-2 border-dashed border-foreground-300 min-h-[300px] min-w-[240px] md:w-0 w-full">
                <CardBody onClick={() => {
                    openModalRouted(SUPPORTED_MODAL_ROUTE.ADD_PARKING_SPACE)
                }} >
                    <div className="flex items-center justify-center h-full">
                        <Add size="60" className="text-primary-500 dark:text-primary" />
                    </div>
                </CardBody>
            </Card>
            <AddParkingSpaceModal isOpen={isModalRoutedOpen} onClose={closeModalRouted} />
        </>
    )
}

export const CardParkingSpace = () => {
    return (
        <Card className="shadow-none active:scale-95 cursor-pointer hover:border-primary/70 border-2 border-dashed border-foreground-300 min-h-[300px] min-w-[240px] md:w-0 w-full">
            <CardBody>
                <div className="flex items-center justify-center h-full">
                    <Add size="60" className="text-primary-500 dark:text-primary" />
                </div>
            </CardBody>
        </Card>
    )
}