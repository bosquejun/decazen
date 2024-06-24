import { getNumeralString } from "@/utils/numerals";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import TextInput, { TextInputProps } from "./TextInput";


// export default function AmountInput<TFormValues extends FieldValues>(props: TextInputProps<TFormValues, false>) {
//     const { watch } = props.formProps;

//     const currentAmount = watch(props.name);

//     const onBlurChange = useCallback(() => {

//         const numeral = getNumeralString(currentAmount ?? 0);

//         props?.formProps?.setValue(props.name, numeral as any, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
//     }, [currentAmount])

//     const stringValue = useMemo(() => {
//         const numeral = getNumeralString(currentAmount ?? 0);

//         props?.formProps?.setValue(props.name, numeral as any, { shouldDirty: true, shouldTouch: true, shouldValidate: true });


//     }, [currentAmount]);


//     return <TextInput
//         {...props}
//         inputMode="decimal"
//         onBlur={onBlurChange}
//         color="default"
//         placeholder="0.00"
//         endContent={<div className="ml-1 text-foreground-300">php</div>}
//         classNames={{
//             input: "text-right"
//         }}
//     />
// }


export default function AmountInput<TFormValues extends FieldValues>(props: TextInputProps<TFormValues, false>) {
    const { watch } = props.formProps;

    const [inputValue, setInputValue] = useState('');

    const currentAmount = watch(props.name);

    console.log({ currentAmount, inputValue });


    // Convert the currentAmount to a numeral string on component mount and whenever currentAmount changes
    useEffect(() => {
        const formattedValue = getNumeralString(currentAmount);
        setInputValue(formattedValue);
    }, [currentAmount]);

    const onBlurChange = useCallback(() => {
        // Format the inputValue to a numeral string on blur
        const formattedValue = getNumeralString(Number(inputValue));
        setInputValue(formattedValue);
        props?.formProps?.setValue(props.name, Number(inputValue.replace(/,/g, '')) as PathValue<TFormValues, Path<TFormValues>>, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }, [inputValue, props]);

    const onFocusChange = useCallback(() => {
        // Remove formatting to revert to plain number format on focus
        const plainNumberValue = inputValue.replace(/,/g, '');
        setInputValue(plainNumberValue);
    }, [inputValue]);

    return (
        <TextInput
            {...props}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputMode="decimal"
            onBlur={onBlurChange}
            onFocus={onFocusChange}
            color="default"
            placeholder="0.00"
            endContent={<div className="ml-1 text-foreground-300">PHP</div>}
            classNames={{
                input: "text-right"
            }}
        />
    );
}