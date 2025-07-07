"use client"

import type { PoliticalParty } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, CalendarIcon, Clock, Info, ThumbsUp, Users } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/custom/navbar"
import WithRole from "@/components/custom/WithRole"
import { addVote, hasVotedInCampaign, getTotalVotes } from "@/web3/contract"
import { use, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import getCampaign from "@/lib/api"
import { useWallet } from "@/web3/WalletProvider"
import { Signer } from "ethers"
import axios from "axios"
import { cn } from "@/lib/utils"


export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params)
    const { connectToMetaMask } = useWallet()

    const { data } = useSession()

    const [signer, setSigner] = useState<Signer | null>(null)

    const [campaign, setCampaign] = useState<any>(null)
    const [hasVoted, setHasVoted] = useState(true)

    const [totalVotes, setTotalVotes] = useState<{ [key: string]: number }>({})

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)

    const [winningParty, setWinningParty] = useState<string | null>(null)


    const fetchCampaign = async () => {
        try {
            const data = await getCampaign(id)
            setCampaign(data)

        } catch (error) {
            console.error("Error fetching campaign:", error)
        } finally {
            setLoading(false)
        }
    }

    async function checkVoteStatus() {
        try {
            const { signer: _signer } = await connectToMetaMask();

            if (_signer === null) {
                console.error("Signer is null");
                return;
            }

            if (!data?.user.id) {
                console.error("User ID is null");
                return;
            }

            setSigner(_signer);
            const hasVoted = await hasVotedInCampaign(_signer, data?.user?.id, campaign?.id);

            setHasVoted(hasVoted);

        } catch (error) {
            console.error("Error checking vote status:", error)
        }
    }

    async function fetchTotalVotes() {
        try {
            const { signer: _signer } = await connectToMetaMask();

            if (_signer === null) {
                console.error("Signer is null");
                return;
            }

            setSigner(_signer);

            let votesData: { [key: string]: number } = {};

            // Use Promise.all to fetch votes for all parties concurrently
            if (campaign?.parties) {
                const votePromises = campaign.parties.map(async (party: PoliticalParty) => {
                    const votes: number = await getTotalVotes(_signer, campaign.id, party.id);
                    return { partyId: party.id, votes };
                });

                const results = await Promise.all(votePromises);

                // Convert results array to object
                results.forEach(({ partyId, votes }) => {
                    votesData[partyId] = votes;
                });

                const isLive = campaign.isActive && new Date() >= campaign.startDate && new Date() <= campaign.endDate
                const isUpcoming = new Date() < campaign.startDate
                const hasEnded = new Date() > campaign.endDate

                if (!isLive && !isUpcoming && hasEnded) {
                    const winningPartyId = Object.keys(votesData).reduce((a, b) => votesData[a] > votesData[b] ? a : b)
                    setWinningParty(winningPartyId)
                    console.log(winningPartyId)
                }

                setTotalVotes(votesData);
            }

            console.log(votesData);

        } catch (error) {
            console.error("Error fetching total votes:", error);
        }
    }

    useEffect(() => {
        fetchCampaign()
    }, [id])

    useEffect(() => {
        fetchTotalVotes()
        checkVoteStatus()
    }, [campaign])

    async function vote(partyId: string) {
        if (!signer) {
            console.error("Signer is not available");
            return;
        }

        if (!data?.user?.id) {
            console.error("User ID is null");
            return;
        }

        const res = await addVote(signer, data?.user?.id, campaign?.id, partyId);

        if (res) {
            alert("Vote added successfully")
        }
    }

    async function handleMailSending() {
        try {
            setSending(true)
            const res = await axios.post("/api/sendCampaignEmails", {
                campaignId: campaign?.id,
            })
            setSending(false)

            if (res.status === 200) {
                alert("Mails sent successfully")
            }
        } catch (error) {
            console.error("Error sending mails:", error)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!campaign) return null

    const isLive = campaign.isActive && new Date() >= campaign.startDate && new Date() <= campaign.endDate
    const isUpcoming = new Date() < campaign.startDate

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full flex items-center justify-between mb-6">
                    <Link href={"/"}>
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Campaigns
                        </Button>
                    </Link>

                    <WithRole allowedRoles="admin">
                        <Button onClick={handleMailSending}>
                            <Users className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            {sending ? "Sending Emails ..." : "Send Notification Mails for this Campaign"}
                        </Button>
                    </WithRole>
                </div>

                <Card className="mb-8 overflow-hidden">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{campaign.title}</CardTitle>
                            <Badge>
                                {isLive ? 'Live' : isUpcoming ? 'Upcoming' : 'Ended'}
                            </Badge>
                        </div>
                        <CardDescription>{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center text-sm mb-2">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>{format(new Date(campaign.startDate), "MMMM d, yyyy")} - {format(new Date(campaign.endDate), "MMMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 " />
                                    <span>
                                        {format(new Date(campaign.startDate), "h:mm a")} - {format(new Date(campaign.endDate), "h:mm a")}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center text-sm">
                                    <Users className="mr-2 h-4 w-4 " />
                                    <span>{campaign?.parties?.length} participating parties</span>
                                </div>
                                <WithRole allowedRoles="voter">
                                    {hasVoted && (
                                        <div className="flex items-center text-sm mt-2">
                                            <ThumbsUp className="mr-2 h-4 w-4" />
                                            <span>You have cast your vote in this campaign</span>
                                        </div>
                                    )}
                                </WithRole>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <h2 className="text-xl font-semibold mb-6">Political Parties</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaign?.parties?.map((party: PoliticalParty) => (
                        <Card
                            key={party.id}
                            className={cn(
                                "overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] duration-300",
                                winningParty === party.id && "shadow-xl",
                                !isLive && !isUpcoming && winningParty !== party.id && "opacity-40",
                            )}
                        >
                            <CardHeader>
                                <CardTitle className="text-lg">{party.name}</CardTitle>
                                <CardDescription>Led by {party.leaderName}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2">
                                {party.establishedDate && (
                                    <p className="text-sm mb-2">
                                        Established: {format(new Date(party.establishedDate), "yyyy")}
                                    </p>
                                )}
                                <p className="text-sm line-clamp-3">{party.manifesto}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Info className="h-4 w-4 mr-2" />
                                            Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{party.name}</DialogTitle>
                                            <DialogDescription className="">Led by {party.leaderName}</DialogDescription>
                                        </DialogHeader>
                                        <div className="py-2">
                                            {party.establishedDate && (
                                                <p className="text-sm mb-2">
                                                    Established: {format(new Date(party.establishedDate), "MMMM d, yyyy")}
                                                </p>
                                            )}
                                            <h4 className="font-medium mb-2">Party Manifesto</h4>
                                            <p>{party.manifesto}</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                {isLive && (
                                    <WithRole allowedRoles="voter">
                                        <Button
                                            disabled={!isLive || hasVoted}
                                            onClick={() => vote(party.id)}
                                            className={
                                                isLive && !hasVoted
                                                    ? "border-none shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                                    : ""
                                            }
                                        >
                                            {isLive && !hasVoted ? "Vote" : hasVoted ? "Voted" : "Unavailable"}
                                        </Button>
                                    </WithRole>
                                )}

                                {!isLive && !isUpcoming ? (
                                    <>
                                        {totalVotes[party.id]?.toString() && (
                                            <Badge>{totalVotes[party.id]?.toString()} Vote</Badge>
                                        )}
                                    </>
                                ) : (
                                    <WithRole allowedRoles="admin">
                                        {totalVotes[party.id]?.toString() && (
                                            <Badge>{totalVotes[party.id]?.toString()} Vote</Badge>
                                        )}
                                    </WithRole>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
