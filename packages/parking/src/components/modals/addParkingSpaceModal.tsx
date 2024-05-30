import { Accordion, AccordionItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import clsx from 'clsx';
import { Add } from 'iconsax-react';
import { useState } from "react";
import { BuildingSelection } from "../common/building-selection";
import { PARKING_SELECTION, ParkingTypeSelection } from "../common/parking-type-selection";
import { FieldLayout } from "../layout/field-layout";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const NUMBER_OF_MOTOR_SLOTS = [...new Array(6).fill(0)].map((_, index) => ({
    value: index + 1,
    label: `${index + 1}`
}));

export const AddParkingSpaceModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {
    const [values, setValues] = useState({
        parkingType: "motor",
        parkingSlotNumber: "",
        motorSlotSection: 1

    })

    return <Modal hideCloseButton scrollBehavior="outside" className="bg-background min-h-[60%]" isOpen={isOpen} onClose={onClose} size="full" placement="center" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                        <h2 className="grow-1 w-full">Add Parking Space</h2>

                        <div className="grow-0 hidden md:flex items-center gap-2">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose} variant="shadow" color="primary">Add Parking Space</Button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="w-full self-center md:min-w-[600px] md:max-w-[900px] px-2 md:px-8">
                    <Accordion variant="splitted" defaultExpandedKeys={["1"]}>
                        <AccordionItem key="1" aria-label="General Information label" title="General Information" subtitle="General information about the parking space such as location, parking type, and slot number"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <FieldLayout fieldName="Parking Type" description="Specifies the type of vehicle the parking space is designed for">
                                <ParkingTypeSelection defaultSelected="car" data={PARKING_SELECTION.slice(0, 2)} classNames={{
                                    tab: "min-h-[40px]",
                                    base: "self-center  w-full max-w-full shadow-none",
                                    tabList: "w-full"
                                }} />
                            </FieldLayout>
                            <FieldLayout fieldName="Building Location" description="Specifies the location of the building where the parking space is situated">
                                <BuildingSelection selectProps={{
                                    selectionMode: "single",
                                }} />
                            </FieldLayout>
                            <FieldLayout fieldName="Parking slot number" description="Specifies the slot number for the individual parking space in the building">
                                <Input color="default" placeholder="Enter parking slot number" />
                            </FieldLayout>
                            <FieldLayout fieldName="Number of motor parking slots" description="Specifies the total number of parking spaces available for motorcycles. Only applicable for motorcycle type of parking">
                                <Select onChange={(e) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        motorSlotSection: parseInt(e.target.value)
                                    }))
                                }} color="default" classNames={{
                                    trigger: "h-[55px]",
                                }} placeholder="Select number of motor parking slots" defaultSelectedKeys={["1"]}>
                                    {NUMBER_OF_MOTOR_SLOTS.map(({ label, value }) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {/* <div className="flex gap-2">
                                    <div onClick={() => {
                                        setValues((prev) => ({
                                            ...prev,
                                            motorSlotSection: prev.motorSlotSection + 1
                                        }))
                                    }} className={clsx("active:scale-95 cursor-pointer text-large border border-default-400 border-dashed font-medium rounded-lg bg-transparent flex items-center justify-center w-[45px] h-[56px]"
                                        , values.motorSlotSection >= 6 && "hidden"
                                    )}>
                                        <Add size={18} />
                                    </div>
                                    {
                                        [...new Array(values.motorSlotSection)].fill(0).map((_, index) => (
                                            <Dropdown key={index} backdrop="blur" isDisabled={values.motorSlotSection <= 1}>
                                                <DropdownTrigger>
                                                    <div className="cursor-pointer active:scale-95 text-large font-medium text-black rounded-lg bg-primary flex items-center justify-center w-[45px] h-[56px]">
                                                        {index + 1}
                                                    </div>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Static Actions">
                                                    <DropdownItem onClick={() => {
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            motorSlotSection: prev.motorSlotSection - 1
                                                        }))
                                                    }} key="remove" className="text-danger" color="danger" startContent={<Icon as={Trash} size={18} />}>
                                                        Remove
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        ))
                                    }
                                </div> */}
                            </FieldLayout>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Rental Information label" title="Rental Information" subtitle="Rental information about the parking space such as price, availability, and restrictions"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <FieldLayout fieldName="Hourly rate" description="Enter the hourly rate for the parking space">
                                <Input color="default" placeholder="0.00" endContent={<div className="ml-1 text-foreground-300">php</div>} classNames={{
                                    input: "text-right"
                                }} />
                            </FieldLayout>
                            <FieldLayout disabled fieldName="Daily rate" description="Enter the daily rate for the parking space">
                                <Input disabled color="default" placeholder="0.00" endContent={<div className="ml-1 text-foreground-300">php</div>} classNames={{
                                    input: "text-right"
                                }} />
                            </FieldLayout>
                            <FieldLayout disabled fieldName="Monthly rate" description="Enter the monthly rate for the parking space">
                                <Input disabled color="default" placeholder="0.00" endContent={<div className="ml-1 text-foreground-300">php</div>} classNames={{
                                    input: "text-right"
                                }} />
                            </FieldLayout>

                            <FieldLayout disabled fieldName="Minimum hours" description="Setting to allow customer to extend their booking duration">
                                <Input disabled color="default" placeholder="1" endContent={<div className="ml-1 text-foreground-300">hr(s)</div>} classNames={{
                                    input: "text-right"
                                }} />
                            </FieldLayout>
                            <FieldLayout disabled fieldName="Allow booking extension" description="Setting to allow customer to extend their booking duration">
                                <Switch size="lg" isDisabled>
                                    Off
                                </Switch>
                            </FieldLayout>
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Media" title="Media" subtitle="Upload images and videos of the parking space to attract customers"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <FieldLayout fieldName="Cover image" description="Upload a cover image for the parking space.">
                                <Button color="default" fullWidth>
                                    Upload
                                </Button>
                            </FieldLayout>
                            {
                                values.parkingType === "car" ?
                                    <FieldLayout disabled fieldName="Parking images" description="Upload images of the parking space.">
                                        <div className={clsx("active:scale-95 cursor-pointer text-large border border-default-400 border-dashed font-medium rounded-lg bg-transparent flex items-center justify-center w-[60px] h-[60px] text-default-600"
                                            , values.motorSlotSection >= 6 && "hidden"
                                        )}>
                                            <Add size={28} />
                                        </div>
                                    </FieldLayout>
                                    : [...new Array(values.motorSlotSection)].fill(0).map((_, index) => (
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
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter className="flex md:hidden">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} variant="shadow" color="primary">Add Parking Space</Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
}

