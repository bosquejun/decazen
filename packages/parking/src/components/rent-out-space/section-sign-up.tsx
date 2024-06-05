"use client"

import CreateAccountForm from "@/forms/create-account.form";
import { CreateUserSchemaType } from "@/forms/schema/auth.schema";
import { Card, CardBody } from "@nextui-org/react";



export const SectionSignUp = ({ onCreateAccount }: { onCreateAccount: (inputs: CreateUserSchemaType) => Promise<void> }) => {

    return <Card>
        <CardBody>
            <div className="flex flex-col p-3 md:p-6 gap-4 ">
                <h1 className="text-2xl text-foreground-700 font-semibold text-center">Create an account to continue</h1>
                <CreateAccountForm onSubmit={onCreateAccount} />
            </div>
        </CardBody>
    </Card>
}