import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { Button, Calendar, CalendarProps, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from "@nextui-org/react";
import { CalendarBoldIcon } from "@nextui-org/shared-icons";
import moment from "moment";
import { useMemo, useState } from "react";


type GetTimeSlotOptions = {
    disablePassedTime?: Date;
}

function formatTimeSlotDisplayValue(date: Date) {
    return moment(date).calendar(null, {
        sameDay: '[Today at] h:mm A',
        nextDay: '[Tomorrow at] h:mm A',
        nextWeek: 'dddd [at] h:mm A',
        lastDay: '[Yesterday at] h:mm A',
        lastWeek: '[Last] dddd [at] h:mm A',
        sameElse: 'DD/MM/YYYY [at] h:mm A'
    })
}

export type TimeSlot = {
    label: string;
    value: string;
    disabled: boolean;
    dateValue: Date;
}

function getTimeSlots(options: GetTimeSlotOptions = {}): TimeSlot[] {
    let { disablePassedTime } = options;

    let shouldDisable = true;
    if (disablePassedTime && moment(disablePassedTime).isAfter(new Date())) {
        shouldDisable = false;
    }

    const currentHour = disablePassedTime ? disablePassedTime?.getHours() : 0;
    const currentMinute = disablePassedTime ? disablePassedTime?.getMinutes() : 0;

    const timeSlots: TimeSlot[] = [];
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        const isPastHour = i < currentHour;
        const isCurrentHour = i === currentHour;

        const dateValue = disablePassedTime ? new Date(disablePassedTime) : new Date();
        dateValue.setHours(i, 0, 0, 0);

        timeSlots.push({
            label: `${hour}:00`,
            value: `${hour}:00`,
            disabled: Boolean(shouldDisable && disablePassedTime && (isPastHour || (isCurrentHour && currentMinute > 0))),
            dateValue
        });

        const dateValueForHalfHour = disablePassedTime ? new Date(disablePassedTime) : new Date();
        dateValueForHalfHour.setHours(i, 30, 0, 0);

        timeSlots.push({
            label: `${hour}:30`,
            value: `${hour}:30`,
            disabled: Boolean(shouldDisable && disablePassedTime && (isPastHour || (isCurrentHour && currentMinute > 30))),
            dateValue: dateValueForHalfHour
        });
    }
    return timeSlots;
}

function getNearestTimeSlot(date: Date, timeSlots: TimeSlot[]) {
    const nearestTimeSlot = timeSlots.find(slot => {
        return !slot.disabled && slot.dateValue > date;
    });
    return nearestTimeSlot;
}


type DateTimePickerProps = {
    label?: string;
    calendarProps?: CalendarProps;
    minimumDate?: Date;
    defaultDate?: Date;
}

export default function DateTimePicker({ label, calendarProps, minimumDate, defaultDate }: DateTimePickerProps) {

    const timeSlots = useMemo(() => getTimeSlots({
        disablePassedTime: defaultDate
    }), [defaultDate]);

    const disabledTimeSlots = useMemo(() => timeSlots.filter((timeSlot) => timeSlot.disabled).map((timeSlot) => timeSlot.value), [timeSlots]);

    const defaultTimeSlot = useMemo(() => getNearestTimeSlot(defaultDate || new Date(), timeSlots), [defaultDate, timeSlots]);

    const [selectedTimeSlot, setSelectedTimeSlot] = useState(defaultTimeSlot);


    return <Popover classNames={{
        base: "bg-transparent",
        content: "bg-transparent shadow-none",
    }}
        offset={10}
    >
        <PopoverTrigger>
            <Input readOnly label={label} {...selectedTimeSlot && {
                value: formatTimeSlotDisplayValue(selectedTimeSlot.dateValue)
            }} endContent={<CalendarBoldIcon className="text-lg text-default-400" />} />
            {/* <Select label={label} classNames={{
                popoverContent: "hidden"
            }} {...selectedTimeSlot && {
                selectedKeys: [selectedTimeSlot.value]
            }}>
                <SelectItem key={selectedTimeSlot?.value as string} value={selectedTimeSlot?.dateValue?.toISOString()} />
            </Select> */}
        </PopoverTrigger>
        <PopoverContent>
            <Calendar
                {...(defaultDate ? { defaultValue: fromDate(defaultDate, getLocalTimeZone()) } : {})}
                {...(minimumDate ? { minValue: fromDate(minimumDate, getLocalTimeZone()) } : {})}

                bottomContent={
                    <div className="flex flex-col px-2 py-1 space-y-1">
                        <Select
                            disallowEmptySelection
                            variant="flat"
                            label="Time slot"
                            labelPlacement="outside-left"
                            className="max-w-xs"
                            classNames={{
                                label: "!w-full size-[16px] text-default-500",
                                base: "items-center w-full justify-between",
                                listbox: "text-center",
                                value: "text-center",
                                trigger: "bg-default-200"
                            }}
                            {...defaultTimeSlot && {
                                defaultSelectedKeys: [defaultTimeSlot.value]
                            }}
                            disabledKeys={disabledTimeSlots}
                        >
                            {timeSlots.map((timeSlot) => (
                                <SelectItem key={timeSlot.value} value={timeSlot.value}>
                                    {timeSlot.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button color="primary">Done</Button>
                    </div>
                }
                {...calendarProps}
            />

        </PopoverContent>
    </Popover>
}