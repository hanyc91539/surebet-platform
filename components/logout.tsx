'use client'
import { Button } from "@nextui-org/react";
import { LogoutIcon } from "./icons";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { data } from "autoprefixer";

export default function Logout() {
    const { data: session, status: sessionStatus } = useSession()

    return (
        sessionStatus === "authenticated" && (
            <>
                <Button
                    className="text-sm font-normal text-default-600 bg-default-300"
                    variant="flat"
                    startContent={<LogoutIcon />}
                    onClick={() => signOut({ redirect: false })}
                >
                    Logout
                </Button>
            </>
        ));
}
