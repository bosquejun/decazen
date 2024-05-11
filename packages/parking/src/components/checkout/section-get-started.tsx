import { Card, CardBody, Divider, Input } from "@nextui-org/react";

export const SectionStartCheckout = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-3">
            <CardBody className="py-5 gap-4 md:gap-8">
                <span className="text-default-900 text-2xl font-semibold">
                    Let&lsquo;s get started
                </span>

                <div className="flex flex-col gap-6 ">
                    <span className="text-foreground-500">We need some basic information about you so we can contact you about your booking</span>
                    <h2 className="text-foreground-600 font-semibold text-lg">Personal Information</h2>
                    <div className="flex flex-col gap-3 md:gap-6">

                        <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-3 w-full">
                            <Input label="First name" fullWidth />
                            <Input label="Last name" fullWidth />
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-3 w-full">
                            <Input label="Contact number" fullWidth />
                            <Input label="Email (Optional)" fullWidth />
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-3 w-full">
                            <Input label="Building name" fullWidth />
                            <Input label="Unit number" fullWidth />
                        </div>
                    </div>
                    <Divider />
                    <h2 className="text-foreground-600 font-semibold text-lg">Vehicle Information</h2>
                    <span className="text-foreground-500">Your vehicle information number will be shared with the parking space owner/operator</span>
                    <div className="flex flex-col gap-3 md:gap-6">

                        <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-3 w-full">
                            <Input label="Vehicle model" fullWidth />
                            <Input label="Plate number" fullWidth />
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-3 w-full">
                            <Input label="Color (Optional)" fullWidth />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
