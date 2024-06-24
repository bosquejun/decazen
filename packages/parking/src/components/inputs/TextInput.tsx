import { Input, InputProps } from "@nextui-org/react";
import { FieldValues, FormState, Path, PathValue, UseFormReturn } from "react-hook-form";

export type BaseInputProps<TFormValues extends FieldValues, FormOptional = true> = {
    formatValue?: (value: PathValue<TFormValues, Path<TFormValues>>) => PathValue<TFormValues, Path<TFormValues>>;
} & FormOptional extends true ? {
    formProps?: UseFormReturn<TFormValues>
    name: Path<TFormValues>;
} : {
    formProps: UseFormReturn<TFormValues>
    name: Path<TFormValues>;
};

export type TextInputProps<TFormValues extends FieldValues, FormOptional = true> = Omit<InputProps, "name"> & BaseInputProps<TFormValues, FormOptional>;

export const getFieldError = <TFormValues extends FieldValues>(name: Path<TFormValues>, errors?: FormState<TFormValues>["errors"]) => {
    const keys = name.split(".");
    if (keys?.length > 1) {

        return keys.reduce((obj: any, key) => obj && obj?.[key as any], errors as any);
    }

    return errors?.[name];
}

export default function TextInput<TFormValues extends FieldValues, FormOptional = true>({ formProps, ...props }: TextInputProps<TFormValues, FormOptional>) {
    const { formState: { isSubmitting, defaultValues }, register, watch, } = formProps || {
        formState: {
            errors: {}
        }
    } as UseFormReturn<TFormValues>;


    const inputName = props['name'];

    const errorMessage = getFieldError(inputName, formProps?.formState.errors)?.message as string;

    const { required, ...registeredField } = register(inputName);

    const value = watch(inputName);

    return <Input
        {...errorMessage ? {
            isInvalid: true,
            errorMessage,
        } : {
            isInvalid: props?.isInvalid,
            errorMessage: props?.errorMessage
        }}
        {...registeredField}
        value={value}
        {...props}
        isRequired={required || props.isRequired}
        isDisabled={isSubmitting || props.isDisabled || registeredField.disabled}
        defaultValue={defaultValues?.[inputName]}

        name={inputName as string}
        aria-label={inputName}
        aria-labelledby={inputName}
    />
}