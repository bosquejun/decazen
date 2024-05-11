import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { CalendarRemove, CalendarTick, Timer1 } from "iconsax-react";
import { Icon } from "../icons/Icon";

export const SectionBookingDetails = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-3">
            <CardBody className="py-5 gap-4 md:gap-8">
                <span className="text-default-900 text-2xl font-semibold">
                    Booking details
                </span>

                <div className="flex flex-col gap-6 ">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <Icon as={CalendarTick} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                            <span className="text-foreground-600">Parking from</span>
                        </div>
                        <span className="text-foreground font-[500]">20/09/2021</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <Icon as={CalendarRemove} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                            <span className="text-foreground-600">Parking until</span>
                        </div>
                        <span className="text-foreground font-[500]">20/09/2021</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <Icon as={Timer1} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                            <span className="text-foreground-600">Duration</span>
                        </div>
                        <span className="text-foreground font-[500]">16 hours</span>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-foreground-600">Parking fee</span>
                        </div>
                        <span className="text-foreground font-[500]">₱85.00</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-foreground-600">Other fee</span>
                        </div>
                        <span className="text-foreground font-[500]">₱0.00</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-foreground-500 text-large font-semibold">Total parking fee</span>
                        </div>
                        <span className="text-foreground text-large font-semibold">₱85.00</span>
                    </div>
                    <Button size="lg" color="primary" variant="shadow">Checkout</Button>
                </div>
            </CardBody>
        </Card>
    );
};
