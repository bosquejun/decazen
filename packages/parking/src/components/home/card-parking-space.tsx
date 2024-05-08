import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import { Star1 } from "iconsax-react";
import { Icon } from "../icons/Icon";
import { MotorIcon } from "../icons/motor-icon";

const pictureUsers = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
];

export const CardParkingSpace = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-2 py-3 w-full">
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src="https://nextui.org/images/album-cover.png"
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex justify-between items-start w-full">
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-foreground/90">Jun&apos;s Parking Space</h3>
                                    <p className="text-small text-foreground/80">Building - N</p>
                                </div>
                                <h1 className="text-xl text-primary-500 dark:text-primary-700 font-medium mt-2">₱15.00/hr</h1>
                            </div>
                        </div>

                        <div className="flex flex-col mt-3 gap-3"><Chip
                            radius="md"
                            startContent={<Icon
                                as={MotorIcon}
                                size="18"
                                className="text-foreground stroke-current"
                            />}
                            variant="faded"
                            color="default"
                            size="lg"
                        >
                            Motor
                        </Chip>
                            <div className="flex">{
                                [...new Array(5).fill(0)].map((_, index) => (
                                    <Icon
                                        as={Star1}
                                        size="18"
                                        className="text-default-400 stroke-current"
                                        key={index}
                                    />
                                    // <Star1
                                    //     size="18"
                                    //     color="white"
                                    //     key={index}
                                    //     variant="Bold"
                                    // />))
                                ))
                            }</div>

                            <div className="flex justify-between">
                                <p className="text-small">1:23</p>
                                <p className="text-small text-foreground/50">4:32</p>
                            </div>
                        </div>

                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
