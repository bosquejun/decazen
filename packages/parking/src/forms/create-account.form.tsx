
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateUserSchemaType, createUserSchema } from "./schema/auth.schema";

export default function CreateAccountForm({ onSubmit }: { onSubmit: (data: CreateUserSchemaType) => Promise<void> }) {
    const router = useRouter();
    const formProps = useForm<CreateUserSchemaType>({ resolver: yupResolver(createUserSchema) });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = formProps;


    const onSubmitHandler: SubmitHandler<CreateUserSchemaType> = async (data) => {
        await toast.promise(onSubmit(data), {
            loading: 'Creating account...',
            success: 'Account created successfully',
            error: (error) => {
                const { message } = error as Error;
                return message ?? 'Failed to create account';
            }
        });
        router.push("/login?email=" + encodeURIComponent(data.email) + "&callbackUrl=" + encodeURIComponent("/dashboard"));
    };

    return <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
        <TextInput
            formProps={formProps}
            name="first_name"
            label="First name"
            fullWidth
            isRequired
        />
        <TextInput
            formProps={formProps}
            name="last_name"
            label="Last name"
            fullWidth
            isRequired

        />
        <TextInput
            formProps={formProps}
            name="email"
            type="email"
            label="Email address"
            fullWidth
            isRequired

        />
        <PasswordInput
            formProps={formProps}
            label="Password"
            fullWidth
            isRequired
            name="password"
        />

        <PasswordInput
            formProps={formProps}
            label="Confirm Password"
            fullWidth
            isRequired
            name="confirm_password"
        />
        <p className="text-foreground-500">
            By proceeding with creating an account you agree to the Decazen <a className="underline text-primary-400 dark:text-primary" href="">Terms & Conditions</a> and <a className="underline text-primary-400 dark:text-primary" href="https://decazen.com/privacy-policy">Privacy Policy</a>.
        </p>
        <Button isLoading={isSubmitting} type="submit" size="lg" color="primary" variant="shadow">Create account</Button>
    </form>
}