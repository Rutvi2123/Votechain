export type PoliticalParty = {
    id: string
    name: string
    leaderName: string
    manifesto?: string
    establishedDate?: Date
    createdAt: Date
    updatedAt: Date
}

export type VotingCampaign = {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    parties?: PoliticalParty[]
}

