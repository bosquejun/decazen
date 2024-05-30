import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LogoutCurve } from "iconsax-react";
import { signOut, useSession } from "next-auth/react";
import Show from "../common/Show";
import { SidebarItem } from "../sidebar/sidebar-item";

type Props = {
    type?: "button" | "link";
}

export default function LogoutButton({
    type
}: Props) {
    const session = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleLogout = async () => {
        signOut({
            redirect: true,
            callbackUrl: "/"
        });
    }

    if (session.status !== "authenticated") return null;

    return <>
        <Show>
            <Show.When isTrue={type === "link"}>
                <SidebarItem
                    key='logout'
                    title="Log out"
                    icon={<LogoutCurve />}
                    onClick={onOpen}
                    classNames={{
                        base: "text-red-500 dark:text-red-400",
                        itemWrapper: "hover:bg-red-500/20 bg-red-500/10 dark:bg-red-400/20 dark:hover:bg-red-400/30"
                    }}
                />
            </Show.When>
            <Show.Else>
                <Button color="primary" onClick={onOpen}>
                    <LogoutCurve /> Log out
                </Button>
            </Show.Else>

        </Show >
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => <>
                    <ModalHeader>Log out</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to log out? You can always log back in.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button color='danger' onClick={handleLogout}>Log out</Button>
                    </ModalFooter>
                </>}
            </ModalContent>
        </Modal>
    </>

}