'use server'

import { prisma } from "@/lib/prisma"

export default async function getCampaign(id: string) {
    return prisma.votingCampaign.findUnique({
        where: { id },
        include: { parties: true }
    })
}