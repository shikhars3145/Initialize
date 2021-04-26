// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;

contract Campaign{
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
    }
    
    struct Update {
        string image;
        string text;
    }
    
    struct Details{
        string title;
        string story;
        string bannerImg;
        uint goal;
        uint funding;
        uint minContribution;
        address campAddr;
        address manager;
        uint balance;
        Update[] updates;
    }
    
    
    string title;
    string story;
    uint goal;
    uint funding;
    Update [] updates;
    string bannerImg;
    
    address public manager;
    uint public minContribution;
    mapping(address=>bool) approvers;
    mapping(address=>mapping(uint=>bool)) approvals; // approvals[address][i] = true means user at "address" approved Request at index "i" in requests
    uint public approversCount;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender==manager,"This function can only be called by manager of this campaign");
        _;
    }
    
    constructor(string memory _title, string memory _story, string memory _bannerImg, uint _minContribution, uint _goal) {
        manager = tx.origin;
        minContribution = _minContribution;
        goal = _goal;
        title = _title;
        story = _story;
        bannerImg = _bannerImg;
    }
    
    function contribute() external payable{
        require(msg.value >= minContribution,"Atleast minContribution wei required to become a contributor");
        approvers[msg.sender] = true;
        funding+=msg.value;
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
    
    function addUpdate(string calldata image, string calldata text) external restricted
    {
        Update memory newUpdate = Update({
            image: image,
            text: text
        });
        
        updates.push(newUpdate);
    }
    
    function getDetails() view public returns(Details memory) { // title, story, bannerimg, funding, goal, updates
        Details memory campDetails = Details(title, story, bannerImg, goal, funding, minContribution, address(this), manager, address(this).balance, updates);
        
        return campDetails;
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
