import { MINIMUM_AGE, UserProfileSchemaType, userProfileSchema } from "@/forms/schema/user.schema";
import UserProfileForm from "@/forms/user-profile.form";
import useUserContext from "@/hooks/use-user-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import moment from "moment";
import { useForm } from "react-hook-form";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}


export const UserOnboardingModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {
    const userContext = useUserContext();

    const userProfileForm = useForm<UserProfileSchemaType>({
        resolver: yupResolver(userProfileSchema),
        defaultValues: {
            first_name: userContext?.userData?.first_name || "",
            last_name: userContext?.userData?.last_name || "",
            gender: "Male",
            birthdate: moment().subtract(MINIMUM_AGE, 'years').toDate()
        },
        mode: "onBlur"
    });



    return <Modal hideCloseButton scrollBehavior="outside" className="bg-background min-h-[60%]" isOpen={isOpen} onClose={onClose} size="full" placement="center" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                        <h2 className="grow-1 w-full">Start Onboarding</h2>

                        <div className="grow-0 hidden md:flex items-center gap-2">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose} variant="shadow" color="primary">Submit Onboarding</Button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="w-full self-center md:min-w-[600px] md:max-w-[900px] px-2 md:px-8">
                    <Accordion variant="splitted" defaultExpandedKeys={["1"]}>
                        <AccordionItem key="1" aria-label="User Profile" title="User Profile" subtitle="General information about the parking space such as location, parking type, and slot number"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <UserProfileForm formProps={userProfileForm} />
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter className="flex md:hidden">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} variant="shadow" color="primary">Submit Onboarding</Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
}

