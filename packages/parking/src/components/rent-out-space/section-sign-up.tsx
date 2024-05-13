import { Button, Card, CardBody, Input } from "@nextui-org/react"



export const SectionSignUp = () => {
    return <Card>
        <CardBody>
            <div className="flex flex-col p-3 md:p-6 gap-4 ">
                <h1 className="text-2xl text-foreground-700 font-semibold text-center">Create an account to continue</h1>
                <div className="flex flex-col gap-4">
                    <Input
                        label="First name"
                        fullWidth
                    />
                    <Input
                        label="Last name"
                        fullWidth
                    />
                    <Input
                        type="email"
                        label="Email address"
                        fullWidth
                    />
                    <Input
                        type="password"
                        label="Password"
                        fullWidth
                    />
                    <p className="text-foreground-500">
                        By proceeding with creating an account you agree to the Decazen <a className="underline text-primary-400 dark:text-primary" href="">Terms & Conditions</a> and <a className="underline text-primary-400 dark:text-primary" href="https://decazen.com/privacy-policy">Privacy Policy</a>.
                    </p>
                    <Button size="lg" color="primary" variant="shadow">Create account</Button>
                </div>
            </div>
        </CardBody>
    </Card>
}