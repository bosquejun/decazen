import { Button } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Show from "../common/Show";
import { Icon } from "../icons/Icon";
import TextInput, { TextInputProps } from "./TextInput";


type PasswordInputProps<TValues extends FieldValues> = TextInputProps<TValues>;

export default function PasswordInput<TValues extends FieldValues>(props: PasswordInputProps<TValues>) {
    const [show, setShow] = useState(false);

    return <TextInput
        {...props}
        type={show ? "text" : "password"}
        endContent={<Button isIconOnly onClick={() => { setShow(!show) }} variant="light">
            <Show>
                <Show.When isTrue={show}>
                    <Icon as={EyeSlash} />
                </Show.When>
                <Show.Else>
                    <Icon as={Eye} />
                </Show.Else>
            </Show>
        </Button>}
    />
    //     return <Controller name={props.name} control={control} render={({field,fieldState}) => <TextInput
    //     {...props}
    //     type={show ? "text" : "password"}
    //     {...field}
    //     isDisabled={field.disabled}
    //     isInvalid={fieldState.invalid}
    //     errorMessage={fieldState?.error?.message}
    //     endContent={<Button isIconOnly onClick={() => { setShow(!show) }} variant="light">
    //         <Show>
    //             <Show.When isTrue={show}>
    //                 <Icon as={EyeSlash} />
    //             </Show.When>
    //             <Show.Else>
    //                 <Icon as={Eye} />
    //             </Show.Else>
    //         </Show>
    //     </Button>}
    // />} />
}