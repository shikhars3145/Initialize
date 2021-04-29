import { Container, Typography } from '@material-ui/core';
import CampaignsShowcase from '../components/CampaignShowcase';
import Hero from '../components/Hero'

export default function Home() {

  const camps = [
    ['Release The Snyder Cut', 'Some story', 'brokeimage', 500, 700, 4000000000000, '0x843468468684'],
    ['Some Interesting name', 'Some story', 'brokeimage', 1800, 700, 5278000000, '0x843468468684'],
    ['Release The Snyder Verse', 'Some story', 'brokeimage', 500, 1800, 40000000000010, '0x843468468684'],
    ['Boring Company', 'Some story', 'brokeimage', 5100, 7200, 40000000000010, '0x843468468684'],
    ['Dunkin Donut', 'Some story', 'brokeimage', 900, 500, 40000000000010, '0x843468468684'],
    ['Nolan is genius', 'Some story', 'brokeimage', 500, 1200, 40000000000010, '0x843468468684'],
    ['Oxygen Help', 'Some story', 'brokeimage', 100, 700, 40000000000010, '0x843468468684'],
    ['Need Medicine', 'Some story', 'brokeimage', 700, 700, 40000000000010, '0x843468468684'],
  ];
  return (
      <Container style={{textAlign:"center"}}>
      <Hero/>
      <Typography variant="h4" style={{marginBottom:"2rem"}}>
        Featured Campaigns:
      </Typography>
      <CampaignsShowcase campaigns={camps} searchQuery="" sortBy="percent" limit={3}/>
      </Container>
  )
}
