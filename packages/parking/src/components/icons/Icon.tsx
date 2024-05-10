import clsx from 'clsx';
import React from "react";


type IconProps = { size?: number | string, color?: string, className?: string, style?: React.CSSProperties, as: React.ElementType; variant?: string }

export const Icon = ({ size, color, className, style, as, variant }: IconProps) => {

    return <div className={clsx("app-icon stroke-current", className)}>
        {
            React.createElement(as, {
                size: size,
                color: color,
                className: className,
                style: style,
                variant
            })
        }
    </div>
}