import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, Users } from "lucide-react"
import { format } from "date-fns"
import { VotingCampaign } from "@/types"
import Link from "next/link"

type CampaignCardProps = {
    campaign: VotingCampaign
    status: "live" | "upcoming" | "ended"
}

export default function CampaignCard({ campaign, status }: CampaignCardProps) {
    return (
        <Link href={`/campaign/${campaign.id}`}>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg group-hover:opacity-90 transition-colors">
                            {campaign.title}
                        </CardTitle>
                        {status === "live" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/30 border border-green-500/30 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-400 mr-1.5 animate-pulse"></span>
                                Live
                            </span>
                        )}
                        {status === "upcoming" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/30 border border-blue-500/30 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-blue-400 mr-1.5"></span>
                                Upcoming
                            </span>
                        )}
                        {status === "ended" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/30 border border-red-500/30 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></span>
                                Ended
                            </span>
                        )}
                    </div>
                    <CardDescription className="opacity-70">{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="flex items-center text-sm mb-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                        <span>{format(campaign.startDate, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 opacity-60" />
                        <span>
                            {format(campaign.startDate, "h:mm a")} - {format(campaign.endDate, "h:mm a")}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="bg-white/5 flex justify-between border-t border-white/10">
                    <div className="flex items-center text-sm opacity-70">
                        <Users className="mr-2 h-4 w-4" />
                        <span>{campaign?.parties?.length || "Multiple"} parties</span>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-80 hover:opacity-100 hover:bg-white/10">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
