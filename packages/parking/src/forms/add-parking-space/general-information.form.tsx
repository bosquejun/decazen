


import BuildingInput from "@/components/inputs/BuildingInput";
import ParkingTypeInput from "@/components/inputs/ParkingTypeInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddParkingSpaceSchema } from "../schema/add-parking-space.schema";

type AddParkingSpaceFormProps<TFields extends AddParkingSpaceSchema> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}

const NUMBER_OF_MOTOR_SLOTS = [...new Array(6).fill(0)].map((_, index) => ({
    value: index + 1,
    label: `${index + 1}`
}));

export default function GeneralParkingSpaceForm({ formProps }: AddParkingSpaceFormProps<AddParkingSpaceSchema>) {
    const { watch } = formProps;

    const parkingType = watch("generalInformation.parkingType");

    return <React.Fragment>
        <form className="flex flex-col gap-y-6" >
            <FieldLayout fieldName="Parking Type" description="Specifies the type of vehicle the parking space is designed for">
                <ParkingTypeInput
                    excludeSelection={["all"]}
                    formProps={formProps}
                    name="generalInformation.parkingType"
                    defaultSelected="car"
                    classNames={{
                        root: "w-full",
                        tab: "min-h-[40px]",
                        base: "self-center w-full max-w-full shadow-none",
                        tabList: "w-full"
                    }} />
            </FieldLayout>
            <FieldLayout fieldName="Building Location" description="Specifies the location of the building where the parking space is situated">
                <BuildingInput
                    formProps={formProps}
                    name="generalInformation.buildingLocation"
                />
            </FieldLayout>

            <FieldLayout fieldName="Parking slot number" description="Enter parking slot number.">
                <TextInput
                    formProps={formProps}
                    name="generalInformation.parkingSlotNumber"
                    type="number"
                    classNames={{
                        base: "md:min-w-[100px]"
                    }}
                />
            </FieldLayout>

            {/* <Show>
                <Show.When isTrue={parkingType === "motorcycle"}>
                    <FieldLayout fieldName="Number of motor parking slots" description="Specifies the total number of parking spaces available for motorcycles. Only applicable for motorcycle type of parking">

                        <SelectInput
                            fullWidth
                            formProps={formProps}
                            name="generalInformation.numMotorParkingSlot"
                            disallowEmptySelection
                            classNames={{
                                trigger: "min-w-[100px]"
                            }}
                        >
                            {NUMBER_OF_MOTOR_SLOTS.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectInput>
                    </FieldLayout>
                </Show.When>
            </Show> */}

            <FieldLayout fieldName="Area Type" description="Select if the parking slot is covered or uncovered.">
                <Tabs
                    selectedKey={watch("generalInformation.areaType") ?? "covered"}
                    onSelectionChange={(selected: any) => {
                        formProps?.setValue("generalInformation.areaType", selected);
                    }}
                    aria-label="Options"
                    color="primary"
                    classNames={{
                        tab: "min-h-[40px]",
                        base: "self-center w-full max-w-full shadow-none",
                        tabList: "w-full p-2"
                    }}
                    defaultSelectedKey="all"
                    size="lg"
                >
                    <Tab
                        key={"covered"}
                        title="Covered"
                    />
                    <Tab
                        key={"open-space"}
                        title="Open space"
                    />
                </Tabs>
            </FieldLayout>

        </form>
    </React.Fragment>
}