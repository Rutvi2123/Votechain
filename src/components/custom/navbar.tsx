"use client"

import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

    const { data } = useSession();

    async function handleLogout() {
        await signOut({ redirect: true });
    }

    return (
        <header className="backdrop-blur-md bg-white/80 border-b border-pastel-purple/10 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-pastel-purple flex items-center">
                    <div className="w-8 h-8 rounded-full bg-pastel-purple/20 flex items-center justify-center mr-2">
                        <div className="w-4 h-4 rounded-full bg-pastel-purple/80"></div>
                    </div>
                    VoteChain
                </h1>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block px-3 py-1.5 rounded-full">
                        <p className="text-sm font-medium text-pastel-purple">Welcome, {data?.user.name}</p>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleLogout}
                        className="cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )

}