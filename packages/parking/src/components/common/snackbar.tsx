import clsx from 'clsx';
import { Renderable } from 'react-hot-toast';


type SnackBarProps = {
    title?: string;
    message: string | Renderable;
    onClose?: () => void;
    severity?: 'error' | 'warning' | 'info' | 'success';
    hideIndicator?: boolean;
    classNames?: {
        container?: string;
        message?: string;
    }
}


export const SnackBar = ({ message, onClose, title, severity, hideIndicator, classNames }: SnackBarProps) => {
    return <div className={clsx(`flex w-full h-full text-${severity}-700 p-4 rounded-md gap-2 bg-content2`, {
        "bg-red-100 border-red-500 text-red-700": severity === "error",
        "bg-yellow-100 border-yellow-500 text-yellow-700": severity === "warning",
        "bg-blue-100 border-blue-500 text-blue-700": severity === "info",
        "bg-green-100 border-green-500 text-green-700": severity === "success",
    }, classNames?.container)} role="alert">
        {!hideIndicator && <div className={clsx('w-[4px] block rounded-full', {
            "bg-red-500": severity === "error",
            "bg-yellow-500": severity === "warning",
            "bg-blue-500": severity === "info",
            "bg-green-500": severity === "success",
        })} />}
        {
            title && <p className="w-full font-bold">{title}</p>
        }
        {
            typeof message === 'string' ? <p className={clsx('w-full text-foreground', classNames?.message)}>{message}</p> : message
        }
    </div>
}