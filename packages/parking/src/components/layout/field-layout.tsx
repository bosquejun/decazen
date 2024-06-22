import { Chip, Tooltip } from "@nextui-org/react";
import clsx from 'clsx';
import { InfoCircle } from "iconsax-react";
import { HTMLAttributes, ReactNode } from "react";
import Show from "../common/Show";


type FieldLayoutProps = {
    fieldName: string | ReactNode;
    description?: string | ReactNode;
    children: ReactNode;
    disabled?: boolean;
    classNames?: {
        base?: HTMLAttributes<HTMLDivElement>['className'];
        contentWrapper?: HTMLAttributes<HTMLDivElement>['className']
    }
}

export const FieldLayout = ({ fieldName, description, children, disabled, classNames }: FieldLayoutProps) => {
    return (
        <div className={
            clsx("flex flex-col md:flex-row gap-3 md:gap-6 w-full md:justify-between", {
                ["opacity-30"]: disabled,
            })
        }>
            <div className="flex flex-col gap-1 w-full md:max-w-[38%]">
                <div className="flex gap-1 items-center">
                    <div className="text-md text-foreground font-[600]">{fieldName}</div>
                    <Show>
                        <Show.When isTrue={Boolean(description)}>
                            <div className="block md:hidden">
                                <Tooltip content={description}>
                                    <InfoCircle size="18" />
                                </Tooltip>
                            </div>
                        </Show.When>
                    </Show>
                    <Show>
                        <Show.When isTrue={Boolean(disabled)}>
                            <Chip radius="sm">Disabled</Chip>
                        </Show.When>
                    </Show>
                </div>
                <div className="hidden md:block">
                    {description && <div className="text-xs text-foreground/50 dark:text-foreground/40">{description}</div>}
                </div>
            </div>
            <div data-slot="contentWrapper" className={clsx("md:max-w-[50%] flex justify-end", classNames?.contentWrapper)}>{children}</div>
        </div>
    )
}