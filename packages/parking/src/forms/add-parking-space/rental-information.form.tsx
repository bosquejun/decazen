


import Show from "@/components/common/Show";
import AmountInput from "@/components/inputs/AmountInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddParkingSpaceSchema } from "../schema/add-parking-space.schema";

type ParkingRentalInformationFormProps<TFields extends AddParkingSpaceSchema> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}


export default function ParkingRentalInformationForm({ formProps }: ParkingRentalInformationFormProps<AddParkingSpaceSchema>) {

    const isFlatRate = formProps.watch("rentalInformation.isFlatRate");


    return <React.Fragment>
        <form className="flex flex-col gap-y-6">
            <FieldLayout fieldName="Rate type" description="Choose the rental rate type">
                <Tabs
                    isDisabled
                    selectedKey={isFlatRate ? "flat-rate" : "flexible-rate"}
                    onSelectionChange={(selected: any) => {
                        formProps?.setValue("rentalInformation.isFlatRate", selected === "flat-rate" ? true : false);
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
                        key={"flat-rate"}
                        title="Flat rate"
                    />
                    <Tab
                        key={"flexible-rate"}
                        title="Flexible rate"
                    />
                </Tabs>
            </FieldLayout>

            <Show>
                <Show.When isTrue={!isFlatRate}>
                    <FieldLayout fieldName="Hourly rate" description="Enter the hourly rate for the parking space">
                        <AmountInput
                            formProps={formProps}
                            name="rentalInformation.hourlyRate" />
                    </FieldLayout>
                </Show.When>
            </Show>
            <FieldLayout fieldName="Daily rate" description="Enter the daily rate for the parking space">
                <AmountInput
                    formProps={formProps}
                    name="rentalInformation.dailyRate" />
            </FieldLayout>
        </form>
    </React.Fragment>
}