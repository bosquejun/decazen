
import GeneralParkingSpaceForm from "@/forms/add-parking-space/general-information.form";
import ParkingRentalInformationForm from "@/forms/add-parking-space/rental-information.form";
import { AddParkingSpaceSchema, addParkingSpaceSchema } from "@/forms/schema/add-parking-space.schema";
import { useParkingOwner } from "@/providers/parking-owner.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}


export const AddParkingSpaceModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {
    const { addNewParkingSpace } = useParkingOwner();
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
        }
    });

    const { formState: { isValid, isLoading, isSubmitting }, getValues, reset } = addParkingSpaceForm;

    useEffect(() => {
        reset({
            generalInformation: {
                parkingType: "car",
                numMotorParkingSlot: 1,
                areaType: "covered",
                parkingSlotNumber: 0,
            },
            rentalInformation: {
                isFlatRate: true,
                dailyRate: 0
            }
        })
    }, []);


    const onSubmit = async () => {

        await toast.promise(addNewParkingSpace(getValues()), {
            loading: "Adding new parking space...",
            error: "Unable to add new parking space.",
            success: "Successfully added new parking space."
        })
        reset({
            generalInformation: {
                parkingType: "car",
                numMotorParkingSlot: 1,
                areaType: "covered",
                parkingSlotNumber: 0,
            },
            rentalInformation: {
                isFlatRate: true,
                dailyRate: 0
            }
        });
        onClose();
    };



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
                        {/* <AccordionItem key="3" aria-label="Media" title="Media" subtitle="Upload images and videos of the parking space to attract customers"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6"
                            }}>
                            <ParkingSpaceMediaForm formProps={addParkingSpaceForm} />


                        </AccordionItem> */}
                    </Accordion>
                </ModalBody>
                <ModalFooter className="flex md:hidden">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button isLoading={isLoading || isSubmitting} onClick={onSubmit} variant="shadow" color="primary" isDisabled={!isValid}>Add Parking Space</Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
}

