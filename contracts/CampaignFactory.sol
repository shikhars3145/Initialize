// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;
import "./Campaign.sol";

contract CampaignFactory{
    
    Campaign[] deployedCampaigns;
    event campaignDeployed(address contractAddr);
    
    function createCampaign(string memory _title, string memory _story, string memory _bannerImg, uint _minContribution, uint _goal) external {
        Campaign newCampaign = new Campaign(_title, _story, _bannerImg, _minContribution, _goal);
        deployedCampaigns.push(newCampaign);
        emit campaignDeployed(address(newCampaign));
    }
    
    function getDeployedCampaignsAddr() view external returns(Campaign[] memory)
    {
        return deployedCampaigns;
    }
    
    function getDeployedCampaignsDetails() view external returns(Campaign.Details[] memory)
    {
        Campaign.Details[] memory detailedCampaigns = new Campaign.Details[](deployedCampaigns.length);
        
        for(uint i = 0; i<deployedCampaigns.length; i++)
        {
            Campaign.Details memory temp = deployedCampaigns[i].getDetails();
            detailedCampaigns[i] = temp;
        }
        
        return detailedCampaigns;
    }
}