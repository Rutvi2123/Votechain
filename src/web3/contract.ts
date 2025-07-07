import { ethers, Signer } from "ethers";
import { useWallet } from "./WalletProvider";

// Replace with your deployed contract address and ABI
const contractAddress = "0xa012eCb884198CA057c359C6d9d01E4aBEE5a0b7"; // Deployed VoteManager contract address
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "voterId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "campaignId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "partyId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "VoteAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_voterId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_campaignId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_partyId",
                "type": "string"
            }
        ],
        "name": "addVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_campaignId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_partyId",
                "type": "string"
            }
        ],
        "name": "getTotalVotes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_voterId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_campaignId",
                "type": "string"
            }
        ],
        "name": "hasVotedInCampaign",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "votes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "voterId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "campaignId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "partyId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

// Function to get the contract instance
export const getContract = (signer: Signer) => {
    return new ethers.Contract(contractAddress, contractABI, signer);
};

// Function to add a vote
export const addVote = async (signer: Signer, voterId: number, campaignId: string, partyId: string) => {
    if (!signer) throw new Error("Signer not available");

    const contract = getContract(signer);
    const tx = await contract.addVote(voterId, campaignId, partyId);
    await tx.wait();
    return tx.hash;
};

// Function to get total votes for a party in a campaign
export const getTotalVotes = async (signer: Signer, campaignId: number, partyId: string) => {
    if (!signer) throw new Error("Signer not available"); // Handle the case where signer is not available

    const contract = getContract(signer);
    return await contract.getTotalVotes(campaignId, partyId);
};

// Function to check if a voter has voted in a campaign
export const hasVotedInCampaign = async (signer: Signer, voterId: number, campaignId: string) => {
    if (!signer) throw new Error("Signer not available"); // Handle the case where signer is not available

    const contract = getContract(signer);
    return await contract.hasVotedInCampaign(voterId, campaignId);
};