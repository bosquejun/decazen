import { Card, CardBody } from "@nextui-org/react"
import { Add } from "iconsax-react"

export const CardAddParkingSpace = () => {
    return (
        <Card className="active:scale-95 cursor-pointer hover:border-primary/70 border-2 border-dashed border-foreground-300 min-h-[300px] min-w-[240px] md:w-0 w-full">
            <CardBody>
                <div className="flex items-center justify-center h-full">
                    <Add size="60" className="text-primary-500 dark:text-primary" />
                </div>
            </CardBody>
        </Card>
    )
}