

import { signIn } from "@/auth/helpers";
import { Button } from "@nextui-org/react";
import { Grid3, LoginCurve } from "iconsax-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Icon } from "../icons/Icon";

export default function AuthButton() {
    const session = useSession();

    if (session.status === "loading") return null;


    return session?.data?.user ? <React.Fragment>
        <Button as={Link} href="/dashboard" className="hidden md:flex" color="primary" variant="light">
            <Icon as={Grid3} variant="Bold" size="24" /> Dashboard
        </Button>
        <Button isIconOnly className="flex md:hidden" as={Link} href="/dashboard" color="primary" variant="light">
            <Icon as={Grid3} size="24" />
        </Button>
    </React.Fragment> : <React.Fragment>
        <Button className="hidden md:flex" color="primary" onClick={async () => {
            await signIn();
        }} variant="shadow">
            <Icon as={LoginCurve} size="24" className="text-black" /> Login as Parking Owner
        </Button>
        <Button isIconOnly className="flex md:hidden" onClick={async () => {
            await signIn();
        }} color="primary" variant="light">
            <Icon as={LoginCurve} size="24" />
        </Button>
    </React.Fragment>
}

