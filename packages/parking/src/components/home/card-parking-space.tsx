import { Button, Card, CardBody, Chip, Image, Link } from "@nextui-org/react";
import { Star1 } from "iconsax-react";
import { Icon } from "../icons/Icon";
import { MotorIcon } from "../icons/motor-icon";

export const CardParkingSpace = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-2 py-3 w-full">
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={(() => "https://i.pravatar.cc/150")()}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8 h-full">
                        <div className="flex justify-between items-start">
                            <div className="flex justify-between items-start w-full">
                                <div className="flex flex-col">
                                    <h3 className="md:text-lg font-semibold text-foreground/90">Jun&apos;s Parking Space</h3>
                                    <p className="text-small md:text-medium font-medium text-foreground/50">Building - N</p>
                                </div>

                                <Chip
                                    className="py-4"
                                    radius="md"
                                    startContent={<Icon
                                        as={MotorIcon}
                                        size="24"
                                        className="text-default-500 stroke-current"
                                    />}
                                    variant="faded"
                                    color="default"
                                    size="lg"
                                    classNames={{
                                        content: "text-default-500"
                                    }}
                                >
                                    Motor
                                </Chip>
                            </div>
                        </div>

                        <div className="h-full flex flex-col gap-3">
                            <div className="flex items-center gap-x-[2px]">{
                                [...new Array(5).fill(0)].map((_, index) => (
                                    <Icon
                                        as={Star1}
                                        size="18"
                                        className="text-default-400 stroke-current"
                                        key={index}
                                    />
                                ))

                            }
                                <span className="text-default-400 text-[17px] ml-1 mt-[4px] italic">No review</span>
                            </div>

                        </div>
                        <div className="flex flex-col mt-3 gap-3">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl text-primary-500 dark:text-primary-700 font-medium">₱15.00/hr</h1>
                                <Button as={Link} href="/checkout/abc" variant="solid" color="primary">Book now</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </CardBody>
        </Card >
    );
};
