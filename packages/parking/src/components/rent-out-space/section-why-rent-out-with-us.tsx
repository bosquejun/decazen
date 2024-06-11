import { Spacer } from "@nextui-org/react"

const items = [
    {
        title: "Earn money",
        image: "/images/earn-money.svg",
        attribution: <a href="https://storyset.com/money">Money illustrations by Storyset</a>,
        description: "Earn money by renting out your parking space. It's easy!"
    },
    {
        title: "Easy to manage",
        image: "/images/easy-manage.svg",
        attribution: <a href="https://storyset.com/work">Work illustrations by Storyset</a>,
        description: "Manage your parking space easily. You are in control!"
    },
    {
        title: "Reach and Visibility",
        image: "/images/visibility.svg",
        attribution: <a href="https://storyset.com/online">Online illustrations by Storyset</a>,
        description: "Reach more customers and increase your visibility. More bookings!"
    }
]


export const SectionWhyRentOutWithUs = () => {
    return <div className="flex flex-col p-3 md:p-8 gap-4">
        <h1 className="text-3xl text-foreground-700 font-semibold text-center">Why rent out space with Decazen?</h1>
        <Spacer y={2} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 md:gap-2">
            {
                items.map((item, index) => <div key={index} className="flex flex-col items-center justify-center gap-3 p-4">
                    <div className="flex items-center justify-center h-[150px]">
                        {/* {index + 1} */}
                        <img src={item.image} alt={item.title} height={150} width={150} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-center">{item.title}</h3>
                        <p className="text-center text-foreground-500">{item.description}</p>
                    </div>
                </div>)
            }
        </div>

    </div>
}