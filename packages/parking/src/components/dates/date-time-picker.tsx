import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { Button, Calendar, CalendarProps, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from "@nextui-org/react";
import { CalendarBoldIcon } from "@nextui-org/shared-icons";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";


type GetTimeSlotOptions = {
    disablePassedTime?: Date;
    minimumDate?: Date;
}

function formatTimeSlotDisplayValue(date: Date) {
    return moment(date).calendar(null, {
        sameDay: '[Today at] h:mm A',
        nextDay: '[Tomorrow at] h:mm A',
        lastDay: '[Yesterday at] h:mm A',
        nextWeek: 'Do, MMM [at] h:mm A',
        sameElse: 'Do, MMM [at] h:mm A'
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
    const { minimumDate } = options;

    if (disablePassedTime && disablePassedTime.getHours() === 23 && disablePassedTime.getMinutes() >= 30) {
        disablePassedTime = new Date();
        disablePassedTime.setDate(disablePassedTime.getDate() + 1);
        disablePassedTime.setHours(0, 0, 0, 0);
    }

    let shouldDisable = true;
    const targetDate = moment(disablePassedTime).diff(moment(minimumDate), 'days');
    if (disablePassedTime && targetDate >= 1) {
        shouldDisable = false;
    }

    const currentHour = disablePassedTime ? disablePassedTime?.getHours() : 0;
    const currentMinute = disablePassedTime ? disablePassedTime?.getMinutes() : 0;

    const timeSlots: TimeSlot[] = [];
    for (let i = 0; i < 24; i++) {
        const isPastHour = i < currentHour;
        const isCurrentHour = i === currentHour;

        const dateValue = disablePassedTime ? new Date(disablePassedTime) : new Date();
        dateValue.setHours(i, 0, 0, 0);

        const label = moment(dateValue).format('h:mm A');
        const value = dateValue.getTime().toString();

        timeSlots.push({
            label,
            value,
            disabled: Boolean(shouldDisable && (disablePassedTime && (isPastHour || (isCurrentHour && currentMinute > 0) || (minimumDate && moment(dateValue).isBefore(minimumDate))))),
            dateValue
        });

        const dateValueForHalfHour = disablePassedTime ? new Date(disablePassedTime) : new Date();
        dateValueForHalfHour.setHours(i, 30, 0, 0);

        const labelForHalfHour = moment(dateValueForHalfHour).format('h:mm A');
        const valueForHalfHour = dateValueForHalfHour.getTime().toString();

        timeSlots.push({
            label: labelForHalfHour,
            value: valueForHalfHour,
            disabled: Boolean(shouldDisable && (disablePassedTime && (isPastHour || (isCurrentHour && currentMinute > 30)) || (minimumDate && moment(dateValueForHalfHour).isBefore(minimumDate)))),
            dateValue: dateValueForHalfHour
        });
    }
    return timeSlots;
}

function getNearestTimeSlot(date: Date, timeSlots: TimeSlot[]) {
    const nearestTimeSlot = timeSlots.find(slot => {
        const slotDate = new Date(slot.dateValue);
        slotDate.setSeconds(0, 0);
        const currentDate = new Date(date);
        currentDate.setSeconds(0, 0);
        return !slot.disabled && moment(slotDate).isSameOrAfter(moment(currentDate));
    });
    return nearestTimeSlot;
}


type DateTimePickerProps = {
    label?: string;
    calendarProps?: CalendarProps;
    defaultMinimumDate?: Date;
    minimumDate?: Date;
    defaultDate?: Date;
    currentDate?: Date;
    onSelectDate?: (date: Date) => void;
}

export default function DateTimePicker({ label, calendarProps, defaultMinimumDate, minimumDate, defaultDate, onSelectDate, currentDate }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [minValue, setMinValue] = useState(minimumDate);

    const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | undefined>(currentDate ?? defaultDate ?? new Date());

    const timeSlots = useMemo(() => getTimeSlots({
        disablePassedTime: selectedTimeSlot,
        minimumDate,
    }), [selectedTimeSlot]);

    const disabledTimeSlots = useMemo(() => timeSlots.filter((timeSlot) => timeSlot.disabled).map((timeSlot) => timeSlot.value), [timeSlots]);

    const currentTimeSlot = useMemo(() => getNearestTimeSlot(selectedTimeSlot || new Date(), timeSlots), [selectedTimeSlot, timeSlots]);



    useEffect(() => {
        setMinValue(minimumDate);
    }, [minimumDate]);

    useEffect(() => {
        setSelectedTimeSlot(currentDate);
    }, [currentDate])



    return <Popover
        classNames={{
            base: "bg-transparent",
            content: "bg-transparent shadow-none",
        }}
        offset={10}
        isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}
    >
        <PopoverTrigger>
            <Input
                isRequired isReadOnly label={label} {...currentTimeSlot && {
                    value: formatTimeSlotDisplayValue(currentTimeSlot.dateValue)
                }} endContent={<CalendarBoldIcon className="text-lg text-default-400" />} />
        </PopoverTrigger>
        <PopoverContent>
            <Calendar
                value={currentTimeSlot ? fromDate(currentTimeSlot.dateValue, getLocalTimeZone()) : undefined}

                minValue={minValue ? fromDate(minValue, getLocalTimeZone()) : defaultMinimumDate ? fromDate(defaultMinimumDate, getLocalTimeZone()) : undefined}

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
                            {...currentTimeSlot && {
                                selectedKeys: [currentTimeSlot.value]
                            }}
                            disabledKeys={disabledTimeSlots}
                            onChange={(event) => {
                                if (!currentTimeSlot) return;
                                const selected = new Date(+event.target.value);
                                const currentDate = new Date(currentTimeSlot?.dateValue);
                                selected.setDate(currentDate.getDate());
                                selected.setMonth(currentDate.getMonth());
                                selected.setFullYear(currentDate.getFullYear());
                                setSelectedTimeSlot(selected);
                                if (onSelectDate) onSelectDate(selected);
                            }}
                        >
                            {timeSlots.map((timeSlot) => (
                                <SelectItem key={timeSlot.value} value={timeSlot.value}>
                                    {timeSlot.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button color="primary" onClick={() => {
                            setIsOpen(false);
                        }}>Done</Button>
                    </div>
                }
                onChange={(date) => {
                    if (!currentTimeSlot) return;
                    const selected = new Date(date.toDate(getLocalTimeZone()));
                    const currentTime = new Date(currentTimeSlot?.dateValue);
                    selected.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
                    if (moment(selected).isBefore(moment())) {
                        selected.setHours(moment().hours(), moment().minutes(), 0, 0);
                    }
                    setSelectedTimeSlot(selected);
                    if (onSelectDate) onSelectDate(selected);
                }}
                {...calendarProps}
            />

        </PopoverContent>
    </Popover>
}