import { Tab, Tabs, TabsProps } from "@nextui-org/react";
import clsx from 'clsx';
import { useState } from "react";
import { Icon } from "../icons/Icon";
import { CarIcon } from "../icons/car-icon";
import { MotorIcon } from "../icons/motor-icon";

export const PARKING_SELECTION = [{
    id: "car",
    name: "Car",
    icon: <Icon as={CarIcon} />,
},
{
    id: "motorcycle",
    name: "Motorcycle",
    icon: <Icon as={MotorIcon} />,
},
{
    id: "all",
    name: "All",
    icon: null,
}];


type ParkingTypeSelection = {
    defaultSelected: string;
    data: ({
        id: string;
        name: string;
        icon: JSX.Element | null;
    })[];
    classNames?: TabsProps["classNames"]
    hideIconOnMobile?: boolean;
}


export const ParkingTypeSelection = ({ defaultSelected, data, classNames, hideIconOnMobile }: ParkingTypeSelection) => {
    const [selectedParkingType, setSelectedParkingType] = useState(defaultSelected);

    return (
        <Tabs
            selectedKey={selectedParkingType}
            onSelectionChange={(selected) => setSelectedParkingType(selected as string)}
            aria-label="Options"
            color="primary"
            classNames={{
                ...classNames,
                base: clsx("bg-content2 dark:bg-content2 rounded-xl z-10 shadow-lg p-1", classNames?.base),
                tab: clsx("app-tab-item min-w-[90px] md:min-w-[120px] text-black shadow-none min-h-[50px]", classNames?.tab),
                tabList: clsx("bg-transparent", classNames?.tabList),
            }}
            defaultSelectedKey="all"
            size="lg">

            {
                data.map((type) => (
                    <Tab
                        key={type.id}
                        title={
                            <div className="flex items-center gap-x-2">
                                <div className={clsx("tabIcon", hideIconOnMobile ? "hidden md:block" : "")}>
                                    {type.icon && type.icon}
                                </div>
                                <span>{type.name}</span>
                            </div>
                        }
                    />
                ))
            }
        </Tabs>
    )
}