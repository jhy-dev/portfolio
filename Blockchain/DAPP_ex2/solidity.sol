pragma solidity ^0.4.2;

contract votingElection
{
    struct candidate
    {
        bytes32 name;
        uint8 votesfor;
    }
    
    uint8 public totalvotes;
    candidate[] public cnd;

    constructor() public
    {
        candidate memory newcandidate;
        
        if(cnd.length <= 0)
        {
            //newcandidate.votesfor is originally set to 0
            newcandidate.name="candidate1";
            cnd.push(newcandidate);
            newcandidate.name="candidate2";
            cnd.push(newcandidate);
            newcandidate.name="candidate3";
            cnd.push(newcandidate);
        }
    }
    
    
    
    function setVote(bytes32 cd) public
    {
        for(uint i=0;i<cnd.length;i++)
        {
            if(cnd[i].name == cd)
            {
                cnd[i].votesfor++;
                totalvotes++;
            }
        }
    }
    
    function getVote(bytes32 cd) constant public returns(uint8)
    {
        for(uint i=0;i<cnd.length;i++)
        {
            if(cnd[i].name == cd)
            {
                return cnd[i].votesfor;
            }
        }
    }
    
    function getTotalVotes() constant public returns(uint8)
    {
        return totalvotes;
    }
}