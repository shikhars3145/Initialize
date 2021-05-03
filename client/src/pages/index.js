import { Container, Typography } from '@material-ui/core';
import CampaignsShowcase from '../components/CampaignShowcase';
import Hero from '../components/Hero'
import factory from '../utils/factory'

export default function Home({campaigns}) {

  return (
      <Container style={{textAlign:"center"}}>
      <Hero/>
      <Typography variant="h4" style={{marginBottom:"2rem"}}>
        Featured Campaigns:
      </Typography>
      <CampaignsShowcase campaigns={campaigns} searchQuery="" sortBy="percent" limit={3}/>
      </Container>
  )
}

export async function getServerSideProps(context) {
  if(!factory) return {props:{campaigns:[]}}
  const campaigns = await factory.methods.getDeployedCampaignsDetails().call();
  return {
    props: {campaigns}, // will be passed to the page component as props
  }
}