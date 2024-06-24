import { Button, ButtonProps, InputProps, Link } from "@nextui-org/react";
import clsx from "clsx";
import { DocumentText } from "iconsax-react";
import Image from "next/image";
import { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import Show from "../common/Show";
import Label from "../common/label";
import { Icon } from "../icons/Icon";
import { BaseInputProps, getFieldError } from "./TextInput";



type FileInputProps<TFormValues extends FieldValues> = BaseInputProps<TFormValues> & {
    label?: string
    accept?: InputProps['accept'],
    multiple?: boolean
    classNames?: {
        base?: string;
        buttonWrapper?: string;
        button?: string;
    }
    isReadOnly?: boolean;
} & Omit<ButtonProps, "children" | "onClick">;

const image_regex = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg)$/i;

const isFileOrURLAnImage = (fileOrURL: File | string) => {
    if (typeof fileOrURL === "string") {
        return image_regex.test(fileOrURL)
    }
    return image_regex.test(fileOrURL.name)

}


export default function FileInput<TFormValues extends FieldValues>({ formProps, label, accept, multiple, classNames, isReadOnly, ...props }: FileInputProps<TFormValues>) {

    const fileInputId = useMemo(() => `fileInput-${props.name}`, [props.name]);

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formProps) return;
        if (formProps.formState.isSubmitting) return;
        const files = e.target.files;
        if (files?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formProps.setValue(props.name, (multiple ? files : files[0]) as any, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
        }
    }

    const file = formProps?.watch(props.name) as File | string | undefined;

    const errorMessage = getFieldError(props.name, formProps?.formState.errors)?.message as string;



    return <div className={clsx("w-full flex flex-col gap-y-2 justify-end", classNames?.base)}>

        <Show>
            <Show.When isTrue={Boolean(file)}>
                <div className="flex flex-col gap-y-2">
                    <div className="w-full md:max-h-[220px] flex justify-center md:justify-end">
                        {file && <Show>
                            <Show.When isTrue={isFileOrURLAnImage(file)}>
                                <Image
                                    src={typeof file === "string" ? file : URL.createObjectURL(file as File)}
                                    alt="proof-of-residence"
                                    sizes="100vw"
                                    className="max-h-[220px] w-auto"
                                    width={320}
                                    height={220}
                                />
                            </Show.When>
                            <Show.Else>
                                <Link href={file as string} target="_blank"><Icon as={DocumentText} size={64} className="text-foreground" /></Link>
                            </Show.Else>
                        </Show>}
                    </div>
                    <div className="flex gap-x-1 justify-center md:justify-end">
                        {/* <p className="font-bold text-primary-500 dark:text-primary truncate text-right">{typeof file === "string" ? String(file).split("/").pop() : file?.name}</p> */}
                        <Label truncateLength={20} ellipsisMode="middle" content={(typeof file === "string" ? String(file).split("/").pop() : file?.name) as string} classNames={{
                            content: "text-foreground-500"
                        }} />
                        <Show>
                            <Show.When isTrue={!isReadOnly}>
                                <Link className="text-danger cursor-pointer" onClick={() => {
                                    if (!formProps) return;
                                    formProps.setValue(props.name, undefined as any, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
                                }}>Remove</Link>
                            </Show.When>
                        </Show>
                    </div>
                </div>
            </Show.When>
            <Show.Else>
                <div className="flex flex-col gap-y-1">
                    <div className={clsx("flex gap-x-2 items-center w-full justify-end", classNames?.buttonWrapper)}>
                        <Button as="label" {...props} className={clsx("", props.className, classNames?.button)} htmlFor={fileInputId} aria-label={label || "Upload file"}>
                            {label || "Upload file"}
                        </Button>

                        <input aria-labelledby={label || "Upload file"} aria-label={label || "Upload file"} onChange={onUpload} className="hidden" type="file" name={props.name} id={fileInputId} accept={accept} multiple={multiple} />

                    </div>
                    <Show>
                        <Show.When isTrue={Boolean(errorMessage)}>
                            <p className="text-tiny text-danger">{errorMessage}</p>
                        </Show.When>
                    </Show>
                </div>
            </Show.Else>
        </Show>
    </div>
}