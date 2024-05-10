import { Card, CardBody } from "@nextui-org/react";
import { ImageCarousel } from "../images/carousel";

export const SectionParkingDetails = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-3">
            <CardBody className="py-5 gap-4 md:gap-8">
                <span className="text-default-900 text-2xl font-semibold">
                    Parking details
                </span>

                <div className="flex flex-col gap-6 ">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                        <ImageCarousel />
                        <div className="md:min-w-[55%]">
                            <span className="text-foreground-600">Parking name</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
