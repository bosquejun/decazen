import { parseDate } from "@internationalized/date";
import { Calendar, CalendarProps, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { CalendarBoldIcon } from '@nextui-org/shared-icons';
import moment from "moment";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { TextInputProps, getFieldError } from "./TextInput";


type CalendarInputProps<TFormValues extends FieldValues> = Omit<TextInputProps<TFormValues>, "defaultValue"> & {
    calendarProps?: Omit<CalendarProps, "onChange">;
    inputFormat?: string;
};


export default function CalendarInput<TFormValues extends FieldValues>({ formProps, calendarProps, inputFormat, ...props }: CalendarInputProps<TFormValues>) {
    const [isOpen, setIsOpen] = useState(false);

    const { formState: { isSubmitting }, register, setValue, watch, trigger } = formProps || {
        formState: {
            errors: {}
        }
    } as UseFormReturn<TFormValues>;
    const inputName = props['name'];

    const errorMessage = getFieldError(inputName, formProps?.formState.errors)?.message as string;

    const { required, ...registeredField } = register(inputName);


    const currentValue = watch(inputName);


    const onDateChange = (selectedDate: string) => {
        setValue(inputName, new Date(`${selectedDate}T00:00:00Z`) as PathValue<TFormValues, Path<TFormValues>>, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }

    return <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{
            base: "bg-transparent",
            content: "bg-transparent shadow-none",
        }}
        offset={5}
        backdrop="opaque"
    >
        <PopoverTrigger>
            <Input {...props}
                {...errorMessage ? {
                    isInvalid: true,
                    errorMessage,
                } : {
                    isInvalid: props?.isInvalid,
                    errorMessage: props?.errorMessage
                }}
                {...currentValue && {
                    value: moment(new Date(currentValue)).format(inputFormat ?? "YYYY-MM-DD")
                }}
                isRequired={required || props.isRequired}
                isDisabled={isSubmitting || props.isDisabled}
                isReadOnly
                endContent={<CalendarBoldIcon className="ml-2 text-lg text-default-400" />} />
        </PopoverTrigger>
        <PopoverContent>
            <Calendar
                showMonthAndYearPickers
                {...currentValue && {
                    value: parseDate(moment(new Date(currentValue)).format("YYYY-MM-DD"))
                }}
                {...calendarProps}

                onChange={(value) => onDateChange(value.toString())}
            />

        </PopoverContent>
    </Popover>
}