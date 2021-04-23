// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;

contract CampaignFactory{
    Campaign[] deployedCampaigns;
    
    function createCampaign(uint minContri) external {
        Campaign newCampaign = new Campaign(minContri);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() view external returns(Campaign[] memory)
    {
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
    }
    
    address public manager;
    uint public minContribution;
    mapping(address=>bool) public approvers;
    mapping(address=>mapping(uint=>bool)) approvals; // approvals[address][i] = true means user at "address" approved Request at index "i" in requests
    uint public approversCount;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender==manager,"This function can only be called by manager of this campaign");
        _;
    }
    
    constructor(uint _minContribution) {
        manager = tx.origin;
        minContribution = _minContribution;
    }
    
    function contribute() external payable{
        require(msg.value >= minContribution,"Atleast minContribution wei required to become a contributor");
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string calldata description, uint value, address payable recipient) public restricted {
        Request memory request = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(request);
    }
    
    function approveRequest(uint index) external {
        
        require(approvers[msg.sender], "You dont have a voting right in this campaign, kindly contribute minimum amount be become an approver");
        require(!approvals[msg.sender][index], "request already approved by you");
        
        approvals[msg.sender][index] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) external restricted {
        Request storage request = requests[index]; // request is reference to requests[index]
        require(!request.complete,"Request already finalised");
        require(request.approvalCount > (approversCount/2), "Majority didnt approved the request, cant finalise");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
}