import { ParkingType } from "@/forms/schema/add-parking-space.schema";
import { Tab, Tabs, TabsProps } from "@nextui-org/react";
import clsx from 'clsx';
import { FieldValues, Path, PathValue } from "react-hook-form";
import Show from "../common/Show";
import { Icon } from "../icons/Icon";
import { CarIcon } from "../icons/car-icon";
import { MotorIcon } from "../icons/motor-icon";
import { BaseInputProps, getFieldError } from "./TextInput";

export const PARKING_SELECTION = [{
    id: "car",
    name: "Car",
    icon: <Icon as={CarIcon} />,
},
{
    id: "motorcycle",
    name: "Motorcycle",
    icon: <Icon as={MotorIcon} />
},
{
    id: "all",
    name: "All",
    icon: null,
}];


type ParkingTypeInputProps<TFormValues extends FieldValues> = BaseInputProps<TFormValues> & {
    defaultSelected: string;
    classNames?: TabsProps["classNames"] & { root?: string }
    hideIconOnMobile?: boolean;
    excludeSelection?: ParkingType[],
}


export default function ParkingTypeInput<TFormValues extends FieldValues>({ formProps, defaultSelected, classNames, hideIconOnMobile, name, excludeSelection }: ParkingTypeInputProps<TFormValues>) {


    const value = formProps?.watch(name) as string;

    const errorMessage = getFieldError(name, formProps?.formState.errors)?.message as string;


    return <div className={clsx("flex flex-col gap-y-2", classNames?.root)}>
        <Tabs
            selectedKey={value}
            onSelectionChange={(selected: any) => {
                formProps?.setValue(name, selected as PathValue<TFormValues, Path<TFormValues>>, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
            }}
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
                PARKING_SELECTION.filter(s => excludeSelection ? !excludeSelection.includes(s.id as any) : true).map((type) => (
                    <Tab
                        isDisabled={type.isDisabled}
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
        <Show>
            <Show.When isTrue={Boolean(errorMessage)}>
                <p className="text-tiny text-danger">{errorMessage}</p>
            </Show.When>
        </Show>
    </div>
}