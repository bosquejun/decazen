import { truncateMiddleContent } from '@/utils/strings';
import { Chip, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { InfoCircle } from 'iconsax-react';
import { useMemo } from 'react';
import Show from './Show';


type LabelProps = {
    content: string | number;
    classNames?: {
        base?: string;
        content?: string;
    }
    tooltipMessage?: string;
    disabled?: boolean;
    ellipsisMode?: "start" | "middle" | "end";
    truncateLength?: number;
}

export default function Label({ content, classNames, tooltipMessage, disabled, ellipsisMode, truncateLength }: LabelProps) {

    const truncatedContent = useMemo(() => {
        switch (ellipsisMode) {
            case "middle":
                return truncateMiddleContent(String(content), truncateLength || 10);
            case "start":
                return "..." + String(content).slice(0, truncateLength || 10);
            default:
                return content;
        }
    }, [ellipsisMode, content]);

    return <div className={clsx("flex gap-1 items-center", classNames?.base)}>
        <p className={clsx("text-md text-foreground font-[600] text-nowrap", {
            "truncate": ellipsisMode === "end"
        }, classNames?.content)}>{truncatedContent}</p>
        <Show>
            <Show.When isTrue={Boolean(tooltipMessage)}>
                <div className="block md:hidden">
                    <Tooltip content={tooltipMessage}>
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
}