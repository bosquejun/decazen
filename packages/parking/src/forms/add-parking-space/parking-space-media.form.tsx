


import { FieldLayout } from "@/components/layout/field-layout";
import clsx from 'clsx';
import { Add } from "iconsax-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddParkingSpaceSchema } from "../schema/add-parking-space.schema";

type ParkingRentalInformationFormProps<TFields extends AddParkingSpaceSchema> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}


export default function ParkingSpaceMediaForm({ formProps }: ParkingRentalInformationFormProps<AddParkingSpaceSchema>) {

    const parkingType = formProps.watch("generalInformation.parkingType");
    const numberOfMotorSlots = formProps.watch("generalInformation.numMotorParkingSlot");



    return <React.Fragment>
        <form className="flex flex-col gap-y-6">
            {/* <FieldLayout fieldName="Cover image" description="Upload a cover image for the parking space.">
                <FileInput name="media.coverImage" formProps={formProps}
                    classNames={{
                        button: "md:max-w-[150px]"
                    }}
                    fullWidth
                    accept="image/*"
                    label="Upload Image"
                />
            </FieldLayout> */}

            {
                parkingType === "car" ?
                    <FieldLayout disabled fieldName="Parking images" description="Upload images of the parking space.">
                        <div
                            className={clsx("active:scale-95 cursor-pointer text-large border border-default-400 border-dashed font-medium rounded-lg bg-transparent flex items-center justify-center w-[60px] h-[60px] text-default-600"
                                , Number(numberOfMotorSlots) >= 6 && "hidden"
                            )}>
                            <Add size={28} />
                        </div>
                    </FieldLayout>
                    : [...new Array(Number(numberOfMotorSlots ?? 0))].fill(0).map((_, index) => (
                        <FieldLayout disabled key={index} fieldName={`Motor slot - ${index + 1} images`} description={`Upload images of the motor parking space fo slot ${index + 1}`}>
                            <div className={clsx("text-large border border-default-400 border-dashed font-medium rounded-lg bg-transparent flex items-center justify-center w-[60px] h-[60px] text-default-600"
                                ,
                                {
                                    "active:scale-95 cursor-pointer": false
                                }
                            )}>
                                <Add size={28} />
                            </div>
                        </FieldLayout>
                    ))
            }
        </form>
    </React.Fragment>
}