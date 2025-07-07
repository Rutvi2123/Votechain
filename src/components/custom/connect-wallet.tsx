"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useWallet } from "@/web3/WalletProvider";

export default function ConnectWallet() {

    const { connectToMetaMask }  = useWallet()
    const [walletAddress, setWalletAddress] = useState<string>()

    useEffect(() => {
        (async () => {
            const res = await connectToMetaMask()
            setWalletAddress(res.address)
        })();
    }, [])

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>
                    {walletAddress ? "Wallet Connected" : "Connect Wallet"}
                </CardTitle>
                <CardDescription>
                    {walletAddress
                        ? walletAddress
                        : "Connect your Ganache using MetaMask Wallet in order to vote."
                    }
                </CardDescription>
            </CardHeader>
            {!walletAddress && (
                <CardContent>
                    <Button onClick={connectToMetaMask}>
                        Connect Wallet
                    </Button>
                </CardContent>
            )}
        </Card>
    )
}