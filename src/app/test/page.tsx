"use client";

import { Button } from "@/components/ui/button";
import { getContract, hasVotedInCampaign } from "@/web3/contract";
import { useWallet } from "@/web3/WalletProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Test() {

    const { data } = useSession()
    const [walletAddress, setWalletAddress] = useState<string>("")
    const { connectToMetaMask } = useWallet()

    const [hasVoted, setHasVoted] = useState("asd")

    async function checkVoteStatus() {
        try {
            const { signer, address } = await connectToMetaMask();
            setWalletAddress(address);

            if (signer === null) {
                console.error("Signer is null");
                return;
            }

            const hasVoted = await hasVotedInCampaign(signer, 1, "cm8lduc0s0003fmjc08ef1zv2");
            console.log("Vote Status:", hasVoted);

            setHasVoted(hasVoted);
        } catch (error) {
            console.error("Error checking vote status:", error);
        }
    }   

    return (
        <div>
            <Button onClick={checkVoteStatus}>Check Vote Status</Button>
            <Button onClick={connectToMetaMask}>connect</Button>
            <h1>has voted : {hasVoted?.toString()}</h1>
            <h1>address : {walletAddress || "-"}</h1>
        </div>
    )
}