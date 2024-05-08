import clsx from 'clsx';
import React from "react";


type IconProps = { size?: number | string, color?: string, className?: string, style?: React.CSSProperties, as: React.ElementType }

export const Icon = ({ size, color, className, style, as }: IconProps) => {

    return <div className={clsx("app-icon text-foreground stroke-current", className)}>
        {
            React.createElement(as, {
                size: size,
                color: color,
                className: className,
                style: style
            })
        }
    </div>
}