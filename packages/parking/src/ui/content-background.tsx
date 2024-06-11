import Show from "@/components/common/Show";
import clsx from "clsx";
import { ReactNode } from "react";


type ContentBackgroundProps = { children: ReactNode, type: "grid" | "dot" | "grid-small", opacity?: number, className?: string, hideGradient?: boolean }


export const ContentBackground = ({ children, type, opacity, className, hideGradient }: ContentBackgroundProps) => {


    return <div className={clsx(`w-full dark:bg-black bg-background dark:bg-${type}/[${opacity}] bg-${type}-black/[${opacity}]`, className)}>
        <Show>
            <Show.When isTrue={!hideGradient}>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            </Show.When>
        </Show>
        {children}
    </div>
}