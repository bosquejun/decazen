import { auth } from "@/auth";
import { Content } from "@/components/dashboard/content";
import { UserData } from "@/types";


export default async function Dashboard() {
    const session = await auth();

    return <Content user={session?.user as UserData ?? null} />
}
