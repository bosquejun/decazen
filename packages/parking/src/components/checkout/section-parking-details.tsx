import { Avatar, Card, CardBody, Divider, Image } from "@nextui-org/react";
import { Building, Star1, TableDocument, UserSquare } from "iconsax-react";
import { Icon } from "../icons/Icon";

export const SectionParkingDetails = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-3">
            <CardBody className="py-5 gap-4 md:gap-8">
                <span className="text-default-900 text-2xl font-semibold">
                    Parking details
                </span>

                <div className="flex flex-col gap-6 ">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                        <div className="w-full">
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={(() => "https://i.pravatar.cc/150")()}
                                width="100%"
                            />
                        </div>
                        <div className="md:min-w-[55%] flex flex-col gap-x-4 md:gap-x-4 gap-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl font-[500] text-foreground-600">Jun&lsquo;s Parking Space</span>
                                <div className="flex items-center gap-x-[2px]">{
                                    [...new Array(5).fill(0)].map((_, index) => (
                                        <Icon
                                            as={Star1}
                                            size="18"
                                            className="text-primary-400 dark:text-primary stroke-current"
                                            key={index}
                                        />
                                    ))

                                }
                                    <span className="text-default-400 text-[17px] ml-1 mt-[4px] italic">No review</span>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <Icon as={Building} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                                    <span className="text-foreground-600">Building</span>
                                </div>
                                <span className="text-foreground font-[500]">N</span>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <Icon as={TableDocument} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                                    <span className="text-foreground-600">Parking Type</span>
                                </div>
                                <span className="text-foreground font-[500]">Motorcycle</span>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <Icon as={UserSquare} size="24" className="text-primary-400 dark:text-primary stroke-current" />
                                    <span className="text-foreground-600">Owner</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-8 h-8 text-tiny" />
                                    <span className="text-foreground font-[500]">Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
