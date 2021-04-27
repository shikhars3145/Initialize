const CampaignFactory = artifacts.require('./CampaignFactory');

contract('factory',async()=>{

    let factory;

    beforeEach(async()=>{
        factory = await CampaignFactory.deployed();
        // console.log("before each called")
    })

    it('deployed',async()=>{
        
        // console.log(factory.address);
        assert.ok(factory.address);
    })

    it('deploys campaign', async()=>{
        const receipt = await factory.createCampaign("Interesting title","convincing story","ipfs image path",100,5000);
        // console.log(receipt);
        const deployedCampaigns = await factory.getDeployedCampaignsAddr();
        // console.log(deployedCampaigns[0]);
        assert.ok(deployedCampaigns[0]);
    })
})