

import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Select, SelectItem, Spacer } from "@nextui-org/react";

import { Tab, Tabs, } from "@nextui-org/react";
import { ArrowDown, ArrowRight, SearchNormal } from "iconsax-react";
import moment from "moment";
import React from "react";
import DateTimePicker from "../dates/date-time-picker";
import { CarIcon } from "../icons/car-icon";
import { MotorIcon } from "../icons/motor-icon";


const parkingType = [{
    id: "car",
    name: "Car",
    icon: <CarIcon />,
},
{
    id: "motorcycle",
    name: "Motorcycle",
    icon: <MotorIcon />,
},
{
    id: "all",
    name: "All",
    icon: null,
}];

const buildings = [
    //     {
    //     name: "all",
    //     label: "All Buildings"
    // }
    {
        name: "N",
        label: "Building N"
    }, {
        name: "M",
        label: "Building M"
    }]

const getCurrentTimeWithAdjustment = (date = new Date(), halfOfHour = false) => {
    if (date.getHours() === 23 && date.getMinutes() >= 30) {
        date = new Date();
        date.setDate(date.getDate() + 1);
        // date.setHours(0, 0, 0, 0);
    }
    const minutes = date.getMinutes();
    if (minutes % 30 !== 0) {
        date.setMinutes(minutes < 30 ? 30 : 0);
        if (minutes >= 30) {
            date.setHours(date.getHours() + 1, 0, 0, 0);
        }
    }
    return date;
}

const computeDuration = (fromDate: Date, untilDate: Date) => {
    const duration = moment.duration(moment(untilDate).diff(moment(fromDate)));
    const totalHours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (totalHours > 0) {
        return `${totalHours} ${totalHours > 1 ? 'hours' : 'hour'}${minutes > 0 ? ', ' : ''}${minutes > 0 ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : ''}`;
    } else {
        return `${Math.floor(minutes)} ${minutes > 1 ? 'minutes' : 'minute'}`;
    }
}

const minimumHours = 1;

export const SearchSection = () => {
    const [selectedParkingType, setSelectedParkingType] = React.useState(parkingType[2].id);
    const [fromDate, setFromDate] = React.useState(getCurrentTimeWithAdjustment());
    const [defaultFromDate] = React.useState(fromDate);
    const [minimumUntilDate, setMinimumUntilDate] = React.useState(moment(getCurrentTimeWithAdjustment(new Date(), true)).add(minimumHours, "hours").toDate());
    const [untilDate, setUntilDate] = React.useState(minimumUntilDate);


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
                            base: "bg-content2 dark:bg-content2 rounded-xl z-10 shadow-lg p-1",
                            tab: "app-tab-item min-w-[90px] md:min-w-[120px] text-black shadow-none min-h-[50px]",
                            tabList: "bg-transparent"
                        }}
                        defaultSelectedKey="all"
                        size="lg">

                        {
                            parkingType.map((type) => (
                                <Tab
                                    key={type.id}
                                    title={
                                        <div className="flex items-center gap-x-2">
                                            <div className="hidden md:block tabIcon">
                                                {type.icon && type.icon}
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
                        <Tabs
                            variant="light"
                            size="lg"
                            color="primary"
                            disabledKeys={["long-term"]}
                            classNames={{
                                cursor: "!opacity-20",
                                tab: "h-[45px] border-2 border-primary",
                                tabContent: "!text-foreground"
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
                            <Autocomplete
                                label="Parking slot #"
                                fullWidth
                                items={[]}
                                startContent={<span className="text-default-400 mr-2"><SearchNormal size="18" /></span>}
                            >
                                {(item: { value: string }) =>
                                    <AutocompleteItem key={item.value} className="capitalize">
                                        {item.value}
                                    </AutocompleteItem>}
                            </Autocomplete>
                            <Select
                                label="Building"
                                placeholder="All buildings"
                                selectionMode="multiple"
                                fullWidth
                            >
                                {
                                    buildings.map((building) => (
                                        <SelectItem key={building.name} value={building.name}>
                                            {building.label}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-6 justify-between items-center">
                            <DateTimePicker
                                label="From"
                                defaultMinimumDate={defaultFromDate}
                                currentDate={fromDate}
                                minimumDate={defaultFromDate}
                                onSelectDate={(date) => {
                                    setFromDate(date);
                                    const untilDate = moment(date).add(minimumHours, "hours").toDate();
                                    setMinimumUntilDate(untilDate);
                                    setUntilDate(untilDate);
                                }} />
                            <div className="hidden md:block">
                                <ArrowRight size="30" className="text-default-300" />
                            </div>
                            <div className="block md:hidden">
                                <ArrowDown size="25" className="text-default-300" />
                            </div>
                            <DateTimePicker
                                label="Until"
                                minimumDate={minimumUntilDate}
                                currentDate={untilDate}
                                onSelectDate={(date) => {
                                    if (moment(date).isSameOrBefore(moment(fromDate))) {
                                        setUntilDate(moment(fromDate).add(minimumHours, "hours").toDate());
                                        return;
                                    }
                                    setUntilDate(date);
                                }}
                            />
                        </div>

                        <div>
                            <Spacer y={2} />
                            <h2 className="text-2xl text-foreground dark:text-primary">
                                Duration: {computeDuration(fromDate, untilDate)}
                            </h2>
                            <Spacer y={2} />
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
