
import { useUserContext } from "@/providers/user.provider";
import { Button, Chip } from "@nextui-org/react";
import clsx from 'clsx';
import { SecurityUser } from "iconsax-react";
import { ReactNode } from "react";
import Show from "../common/Show";
import { Icon } from "../icons/Icon";

export const CardRequiresOnboarding = ({ children, classNames }: {
    children: ReactNode, classNames?: {
        base?: string;
    }
}) => {
    const { requiresOnboarding, isUserForReview } = useUserContext();
    return (
        <div className={clsx('w-full flex relative', classNames?.base)}>
            <Show>
                <Show.When isTrue={requiresOnboarding}>
                    <div className="z-10 absolute flex items-center justify-center w-full h-full flex-col gap-2">
                        <Icon as={SecurityUser} variant="Bulk" className="text-danger-400" size={70} />
                        <p className="text-default-400">Requires User Onboarding</p>
                        <Show>
                            <Show.When isTrue={isUserForReview}>
                                <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Status: For Review</Chip>
                            </Show.When>
                            <Show.Else>
                                <Button variant="light" color="secondary">
                                    Start Onboarding
                                </Button>
                            </Show.Else>
                        </Show>

                    </div>
                </Show.When>
            </Show>
            <div className={clsx('w-full', {
                'blur': requiresOnboarding
            })}>
                {children}
            </div>
        </div>
    )
}