import CampaignCard from "@/components/custom/campaign/CampaignCard";
import ConnectWallet from "@/components/custom/connect-wallet";
import Navbar from "@/components/custom/navbar";
import WithRole from "@/components/custom/WithRole";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { VotingCampaign } from "@/types";


export default async function Home() {

  const live = await prisma.votingCampaign.findMany({
    where: {
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
    include: {
      parties: false,
    },
  });

  const upcoming = await prisma.votingCampaign.findMany({
    where: {
      startDate: {
        gt: new Date(),
      },
    },
    include: {
      parties: false,
    }
  });

  const ended = await prisma.votingCampaign.findMany({
    where: {
      endDate: {
        lt: new Date(),
      },
    },
    include: {
      parties: false,
    }
  });

  const liveCampaigns: VotingCampaign[] = live;
  const upcomingCampaigns: VotingCampaign[] = upcoming;
  const endedCampaigns: VotingCampaign[] = ended;

  return (
    <div className="min-h-screen">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WithRole allowedRoles={"voter"}>
          <ConnectWallet />
        </WithRole>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 p-1 rounded-xl">
            <TabsTrigger
              value="live"
              className="cursor-pointer rounded-lg transition-all duration-300"
            >
              Live Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="cursor-pointer rounded-lg transition-all duration-300"
            >
              Upcoming Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="ended"
              className="cursor-pointer rounded-lg transition-all duration-300"
            >
              Ended Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {liveCampaigns.length === 0 ? (
              <div className="text-center py-12 rounded-xl border">
                <p>No live campaigns at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    status="live"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingCampaigns.length === 0 ? (
              <div className="text-center py-12 rounded-xl border">
                <p>No upcoming campaigns at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    status="upcoming"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ended" className="space-y-4">
            {endedCampaigns.length === 0 ? (
              <div className="text-center py-12 rounded-xl border">
                <p>No Ended campaigns at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {endedCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    status="ended"
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
