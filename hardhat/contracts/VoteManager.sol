// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract VoteManager {
    // Struct to hold vote details
    struct Vote {
        uint256 voterId; // Unique ID of the voter
        string campaignId; // ID of the campaign
        string partyId; // ID of the party voted for
        uint256 timestamp; // Time when the vote was cast
    }

    // Mapping to store votes
    // campaignId => partyId => Vote[]
    mapping(string => mapping(string => Vote[])) public votes;

    // Mapping to track if a voter has voted in a campaign
    // voterId => campaignId => bool
    mapping(uint256 => mapping(string => bool)) public hasVoted;

    // Event to log when a vote is added
    event VoteAdded(
        uint256 voterId,
        string campaignId,
        string partyId,
        uint256 timestamp
    );

    // Function to add a vote
    function addVote(
        uint256 _voterId,
        string memory _campaignId,
        string memory _partyId
    ) public {
        // Ensure the voter hasn't already voted in this campaign
        require(
            !hasVoted[_voterId][_campaignId],
            "Voter has already voted in this campaign"
        );

        // Create a new vote
        Vote memory newVote = Vote({
            voterId: _voterId,
            campaignId: _campaignId,
            partyId: _partyId,
            timestamp: block.timestamp
        });

        // Add the vote to the votes mapping
        votes[_campaignId][_partyId].push(newVote);

        // Mark the voter as having voted in this campaign
        hasVoted[_voterId][_campaignId] = true;

        // Emit an event
        emit VoteAdded(_voterId, _campaignId, _partyId, block.timestamp);
    }

    // Function to get the total votes for a specific party in a campaign
    function getTotalVotes(
        string memory _campaignId,
        string memory _partyId
    ) public view returns (uint256) {
        return votes[_campaignId][_partyId].length;
    }

    // Function to check if a voter has voted in a campaign
    function hasVotedInCampaign(
        uint256 _voterId,
        string memory _campaignId
    ) public view returns (bool) {
        return hasVoted[_voterId][_campaignId];
    }
}
