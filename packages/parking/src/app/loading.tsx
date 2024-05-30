import { Spinner } from "@nextui-org/react";

export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
    </div>
}