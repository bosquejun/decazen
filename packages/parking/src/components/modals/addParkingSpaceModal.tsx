import GeneralParkingSpaceForm from "@/forms/add-parking-space/general-information.form";
import ParkingSpaceMediaForm from "@/forms/add-parking-space/parking-space-media.form";
import ParkingRentalInformationForm from "@/forms/add-parking-space/rental-information.form";
import { AddParkingSpaceSchema, addParkingSpaceSchema } from "@/forms/schema/add-parking-space.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const NUMBER_OF_MOTOR_SLOTS = [...new Array(6).fill(0)].map((_, index) => ({
    value: index + 1,
    label: `${index + 1}`
}));

export const AddParkingSpaceModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {
    const addParkingSpaceForm = useForm<AddParkingSpaceSchema>({
        resolver: yupResolver(addParkingSpaceSchema),
        mode: "onTouched",
        resetOptions: {
            keepDefaultValues: true,
            keepDirty: false,
            keepIsValid: true,
            keepTouched: false,
            keepIsValidating: false,
            keepIsSubmitted: false,
            keepErrors: false,
            keepDirtyValues: false,
        },
        defaultValues: {
            generalInformation: {
                numMotorParkingSlot: 1,
            },
            rentalInformation: {
                isFlatRate: true,
            }
        }
    });

    const { formState: { isValid, isLoading, isSubmitting }, getValues } = addParkingSpaceForm;

    const onSubmit = async () => {
        const data = getValues();
        await new Promise(resolve => setTimeout(resolve, 2000));
        onClose();
    }


    return <Modal hideCloseButton scrollBehavior="inside" className="bg-background min-h-full" isOpen={isOpen} onClose={onClose} size="full" placement="center" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                        <h2 className="grow-1 w-full">Add Parking Space</h2>

                        <div className="grow-0 hidden md:flex items-center gap-2">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button isLoading={isLoading || isSubmitting} onClick={onSubmit} variant="shadow" color="primary" isDisabled={!isValid}>Add Parking Space</Button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="w-full self-center md:min-w-[600px] md:max-w-[900px] px-2 md:px-8">
                    <Accordion variant="splitted" defaultExpandedKeys={["1", "2", "3"]} selectionMode="multiple">
                        <AccordionItem key="1" aria-label="General Information label" title="General Information" subtitle="General information about the parking space such as location, parking type, and slot number"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <GeneralParkingSpaceForm formProps={addParkingSpaceForm} />
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Rental Information label" title="Rental Information" subtitle="Rental information about the parking space such as price, availability, and restrictions"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <ParkingRentalInformationForm formProps={addParkingSpaceForm} />
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Media" title="Media" subtitle="Upload images and videos of the parking space to attract customers"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <ParkingSpaceMediaForm formProps={addParkingSpaceForm} />


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

