import { Button, ButtonProps, InputProps, Link } from "@nextui-org/react";
import clsx from "clsx";
import { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import Show from "../common/Show";
import { BaseInputProps } from "./TextInput";



type FileInputProps<TFormValues extends FieldValues> = BaseInputProps<TFormValues> & {
    label?: string
    accept?: InputProps['accept'],
    multiple?: boolean
    classNames?: {
        base?: string;
        buttonWrapper?: string;
        button?: string;
    }
} & Omit<ButtonProps, "children" | "onClick">;


export default function FileInput<TFormValues extends FieldValues>({ formProps, label, accept, multiple, classNames, ...props }: FileInputProps<TFormValues>) {

    const fileInputId = useMemo(() => `fileInput-${props.name}`, [props.name]);

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formProps) return;
        if (formProps.formState.isSubmitting) return;
        const files = e.target.files;
        if (files?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formProps.setValue(props.name, (multiple ? files : files[0]) as any);
        }
        formProps.trigger(props.name)
    }

    const file = formProps?.watch(props.name) as File | undefined;


    return <div className={clsx("w-full flex flex-col gap-y-2 justify-end", classNames?.base)}>
        <div className={clsx("flex gap-x-2 items-center w-full justify-end", classNames?.buttonWrapper)}>
            <Button as="label" {...props} className={clsx("", props.className, classNames?.button)} htmlFor={fileInputId} aria-label={label || "Upload file"}>
                {label || "Upload file"}
            </Button>

            <input aria-labelledby={label || "Upload file"} aria-label={label || "Upload file"} onChange={onUpload} className="hidden" type="file" name={props.name} id={fileInputId} accept={accept} multiple={multiple} />

        </div>
        <Show>
            <Show.When isTrue={Boolean(file)}>
                <div className="flex gap-x-1">
                    <p className="font-bold text-primary-500 dark:text-primary truncate text-right">{file?.name}</p>
                    <Link className="text-danger cursor-pointer" onClick={() => {
                        if (!formProps) return;
                        formProps.reset({ [props.name]: undefined } as any)
                        formProps.trigger(props.name);

                    }}>Remove</Link>
                </div>
            </Show.When>
        </Show>
    </div>
}