import { Card, CardBody, Spacer } from "@nextui-org/react"

const items = [
    {
        title: "Earn money",
        description: "Earn money by renting out your parking space. It's easy!"
    },
    {
        title: "Easy to manage",
        description: "Manage your parking space easily. You are in control!"
    },
    {
        title: "Reach and Visibility",
        description: "Reach more customers and increase your visibility. More bookings!"
    }
]


export const SectionWhyRentOutWithUs = () => {
    return <div className="flex flex-col p-3 md:p-8 gap-4">
        <h1 className="text-3xl text-foreground-700 font-semibold text-center">Why rent out space with Decazen?</h1>
        <Spacer y={6} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 md:gap-2">
            {
                items.map((item, index) => <Card key={index} >
                    <CardBody>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 text-large rounded-full bg-primary text-black font-semibold">
                                {index + 1}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold text-center">{item.title}</h3>
                                <p className="text-center text-foreground-500">{item.description}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>)
            }
        </div>
    </div>
}