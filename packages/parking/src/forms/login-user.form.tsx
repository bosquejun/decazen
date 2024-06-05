
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginUserSchemaType, loginUserSchema } from "./schema/auth.schema";

export default function LoginUserForm({ callbackUrl, onSubmit, defaultValues }: { callbackUrl?: string, defaultValues: Partial<LoginUserSchemaType>, onSubmit: (data: LoginUserSchemaType) => Promise<void> }) {
    const router = useRouter();
    const formProps = useForm<LoginUserSchemaType>({
        resolver: yupResolver(loginUserSchema), defaultValues: {
            email: defaultValues?.email || "",
            password: defaultValues?.password || ""
        }
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = formProps;




    const onSubmitHandler: SubmitHandler<LoginUserSchemaType> = async (data) => {
        await toast.promise(onSubmit(data), {
            loading: 'Logging in...',
            success: 'Logged in successfully',
            error: (error) => {
                const { message } = error as Error;
                return message ?? 'Invalid credentials';
            }
        });
        router.push(callbackUrl ?? "/");
    };

    return <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full justify-center h-full">
            <h1 className="text-2xl font-semibold text-foreground">Welcome back, <strong className="text-primary-500 dark:text-primary">Parking owner</strong>!</h1>
            <p className="text-foreground-700">Sign in to your account to continue</p>
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

            <Button fullWidth isLoading={isSubmitting} size="lg" type="submit" color="primary" variant="shadow">Login</Button>
        </div>
    </form>
}