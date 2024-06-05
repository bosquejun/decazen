
import { useUserContext } from "@/providers/user.provider";
import { Button } from "@nextui-org/react";
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
    const { requiresOnboarding } = useUserContext();
    return (
        <div className={clsx('w-full flex relative', classNames?.base)}>
            <Show>
                <Show.When isTrue={requiresOnboarding}>
                    <div className="z-10 absolute flex items-center justify-center w-full h-full flex-col gap-2">
                        <Icon as={SecurityUser} variant="Bulk" className="text-danger-400" size={70} />
                        <p className="text-default-400">Requires User Onboarding</p>
                        <Button variant="light" color="secondary">
                            Start Onboarding
                        </Button>
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