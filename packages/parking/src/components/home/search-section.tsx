

import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Spacer } from "@nextui-org/react";

import { ArrowDown, ArrowRight, SearchNormal } from "iconsax-react";
import moment from "moment";
import React from "react";
import { BuildingSelection } from "../common/building-selection";
import { PARKING_SELECTION, ParkingTypeSelection } from "../common/parking-type-selection";
import DateTimePicker from "../dates/date-time-picker";



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
    }
    const minutes = date.getMinutes();
    if (minutes % 30 !== 0) {
        date.setMinutes(minutes < 30 ? 30 : 0);
        if (minutes >= 30) {
            date.setHours(date.getHours() + 1, 0, 0, 0);
        }
    }

    date.setSeconds(0, 0);
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
    const [selectedParkingType, setSelectedParkingType] = React.useState("all");
    const [fromDate, setFromDate] = React.useState(getCurrentTimeWithAdjustment());
    const [defaultFromDate] = React.useState(fromDate);
    const [minimumUntilDate, setMinimumUntilDate] = React.useState(moment(getCurrentTimeWithAdjustment(new Date(), true)).add(minimumHours, "hours").toDate());
    const [untilDate, setUntilDate] = React.useState(minimumUntilDate);


    return (
        <div className="flex flex-col w-full  md:min-w-[800px] md:max-w-[800px]">
            <div className="flex justify-center w-full">
                <div className="flex flex-col mt-[-30px] z-10 absolute">
                    <ParkingTypeSelection data={PARKING_SELECTION} defaultSelected="all" />
                </div>
            </div>
            <Card className="shadow-md px-3 w-full">
                <CardBody className="py-6 overflow-hidden">
                    <Spacer y={10} />
                    <div className="flex flex-col space-y-3 md:space-y-4">
                        <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-6 justify-between items-center">
                            <Autocomplete
                                isRequired
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
                            <BuildingSelection selectProps={{
                                placeholder: "All buildings",
                                selectionMode: "multiple",
                            }} />
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

                        <div className="flex md:flex-row flex-col justify-between items-center">
                            <div className="w-full">
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
                    </div>

                </CardBody>
            </Card>
        </div>
    );
};
