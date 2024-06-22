import { useTimer } from "@/hooks/use-timer";
import { useUserContext } from "@/providers/user.provider";
import { Avatar, Skeleton } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import Show from "../common/Show";

const getTimeGreetings = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return "Good morning";
    } else if (currentHour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export const DashboardContentHeader = () => {

    const { userData, isAuthenticated } = useUserContext();
    const params = useSearchParams();
    const currentTime = useTimer({
        isPaused: params.has('modal')
    });

    return <div className="flex gap-2 items-center grow-1">
        <div className="grow-1">
            <Show>
                <Show.When isTrue={isAuthenticated}>
                    <Avatar size="lg" src={`https://robohash.org/${userData?.email}?gravatar=yes&set=set5`} />
                </Show.When>
                <Show.Else>
                    <Skeleton className="flex rounded-full w-[56px] h-[56px]" />
                </Show.Else>
            </Show>
        </div>
        <div className="flex flex-col gap-y-1  w-full">
            <div className="flex gap-x-2 items-end">
                <h1 className="flex-none text-lg md:text-2xl text-foreground-700 font-[500]">👋 {getTimeGreetings()},</h1>
                <Show>
                    <Show.When isTrue={isAuthenticated}>
                        <h1 className="text-lg md:text-2xl text-foreground-700 font-[600]">{userData?.first_name}</h1>
                    </Show.When>
                    <Show.Else>
                        <Skeleton className="grow-[2] flex rounded-md max-w-[100px] h-8" />
                    </Show.Else>
                </Show>
            </div>
            <p className="text-foreground-500" suppressHydrationWarning>Today is {currentTime}</p>
        </div>
    </div>
}