"use client"

import { Card, CardBody } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { useState } from "react";
import { AddParkingSpaceModal } from "../modals/addParkingSpaceModal";

export const CardAddParkingSpace = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Card className="shadow-none active:scale-95 cursor-pointer hover:border-primary/70 border-2 border-dashed border-foreground-300 min-h-[300px] min-w-[240px] md:w-0 w-full">
                <CardBody onClick={() => {
                    setIsOpen(true);
                }} >
                    <div className="flex items-center justify-center h-full">
                        <Add size="60" className="text-primary-500 dark:text-primary" />
                    </div>
                </CardBody>
            </Card>
            <AddParkingSpaceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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