import { Button } from "@nextui-org/react"
import clsx from 'clsx'
import toast, { ToastBar, Toaster } from "react-hot-toast"
import { Icon } from "../icons/Icon"
import { CloseIcon } from "../icons/close-icon"
import Show from "./Show"


export default function Toast() {
    return <Toaster position="top-right" toastOptions={{
        className: '!bg-content2 !text-foreground',
        duration: 3000,
    }}>
        {(t) => {
            return <ToastBar toast={t}>
                {({ message, }) =>
                    <div className="flex gap-1">
                        <Show>
                            <Show.When isTrue={['error', 'success'].includes(t.type)}>
                                <div className={clsx('w-[5px] block rounded-full', {
                                    "severity-error": t.type === "error",
                                    "severity-success": t.type === "success",
                                })} />
                            </Show.When>
                        </Show>
                        <div className="w-full">
                            {typeof message === 'string' ? <p className='w-full'>{message}</p> : message}
                        </div>
                        <Show>
                            <Show.When isTrue={t.type !== "loading"}>
                                <Button className="self-center !p-0 min-w-[20px] max-w-[20px] h-[20px] rounded-[4px]" size="sm" isIconOnly onClick={() => toast.dismiss(t.id)}>
                                    <Icon as={CloseIcon} className="text-default-600" size={12} />
                                </Button>
                            </Show.When>
                        </Show>
                    </div>
                }
            </ToastBar>
        }}
    </Toaster>
}