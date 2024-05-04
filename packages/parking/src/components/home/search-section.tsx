

import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Spacer } from "@nextui-org/react";

import { Tab, Tabs, } from "@nextui-org/react";
import { ArrowDown, ArrowRight } from "iconsax-react";
import moment from "moment";
import React from "react";
import DateTimePicker from "../dates/date-time-picker";
import { CarIcon } from "../icons/car-icon";
import { MotorIcon } from "../icons/motor-icon";


const parkingType = [{
    id: "car",
    name: "Car",
    icon: (color: string) => <CarIcon color={color} />,
},
{
    id: "motorcycle",
    name: "Motorcycle",
    icon: (color: string) => <MotorIcon color={color} />,
},
{
    id: "all",
    name: "All",
    icon: null,
}];

export const SearchSection = () => {
    const [selectedParkingType, setSelectedParkingType] = React.useState(parkingType[2].id);
    const [fromDate, setFromDate] = React.useState(new Date());

    return (
        <div className="flex flex-col w-full  md:min-w-[800px] md:max-w-[800px]">
            <div className="flex justify-center w-full">
                <div className="flex flex-col mt-[-30px] z-10 absolute">
                    <Tabs
                        selectedKey={selectedParkingType}
                        onSelectionChange={(selected) => setSelectedParkingType(selected as string)}
                        aria-label="Options"
                        color="primary"
                        classNames={{
                            base: "light:bg-content2 dark:bg-content2 rounded-xl z-10 shadow-lg p-1",
                            tab: "min-w-[90px] md:min-w-[120px] text-black shadow-none min-h-[50px]",
                            tabList: "bg-transparent"
                        }}
                        defaultSelectedKey="all"
                        size="lg">

                        {
                            parkingType.map((type) => (
                                <Tab
                                    key={type.id}
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <div className="hidden md:block">
                                                {type.icon && type.icon(selectedParkingType === type.id ? "white" : "#717171")}
                                            </div>
                                            <span>{type.name}</span>
                                        </div>
                                    }
                                />
                            ))
                        }
                    </Tabs>
                </div>
            </div>
            <Card className="shadow-md px-3 w-full">
                <CardBody className="py-6 overflow-hidden">
                    <Spacer y={10} />
                    <div className="flex flex-col space-y-3 md:space-y-4">
                        <Autocomplete
                            label="Park at"
                            fullWidth
                        >
                            {[{
                                label: "All buildings",
                                value: "ALL"
                            }, {
                                label: "Building N",
                                value: "N"
                            },

                            {
                                label: "Building M",
                                value: "M"
                            }
                            ].map((bldng) => (
                                <AutocompleteItem key={bldng.value} value={bldng.value}>
                                    {bldng.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Tabs
                            variant="solid"
                            size="lg"
                            fullWidth
                            color="primary"
                            disabledKeys={["long-term"]}
                            classNames={{
                                cursor: "!opacity-20",
                                tab: "h-[56px]",
                                tabContent: "!text-default-500"
                            }}
                        >

                            {
                                [{
                                    id: "short-term",
                                    title: "Hourly/Daily"
                                }, {
                                    id: "long-term",
                                    title: "Monthly/Long term",
                                }].map((term) => (
                                    <Tab
                                        key={term.id}
                                        title={term.title}
                                    />
                                ))
                            }
                        </Tabs>
                        <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-6 justify-between items-center">
                            <DateTimePicker label="From" minimumDate={fromDate} defaultDate={fromDate} />
                            <div className="hidden md:block">
                                <ArrowRight size="35" className="text-default-400" />
                            </div>
                            <div className="block md:hidden">
                                <ArrowDown size="25" className="text-default-400" />
                            </div>
                            <DateTimePicker label="Until" minimumDate={moment(fromDate).add(30, "minutes").toDate()} defaultDate={moment(fromDate).add(1, "days").toDate()} />
                        </div>
                        <Button color="primary" fullWidth size="lg">
                            Show parking spaces
                        </Button>
                    </div>

                </CardBody>
            </Card>
        </div>
    );
};
