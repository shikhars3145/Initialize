import { Container, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import About from '../components/About';
import CampaignsShowcase from '../components/CampaignShowcase';
import Hero from '../components/Hero'
import theme from '../themes/theme';
import factory from '../utils/factory'

const useStyles = makeStyles((theme)=>({
  root:{
    textAlign:"center", 
    paddingBottom:"1rem",
    background: theme.palette.primary.main
  },
  explore:{
    cursor:"pointer",
    width:"fit-content",
    margin:"1rem auto",
    color:"#fff",
    '&:hover':{
      color:theme.palette.secondary.main,
      transform: "scale(1.05)",
      transition: "all 0.2s linear"
    }
  }
}))

export default function Home({campaigns}) {
  const classes = useStyles();
  const router = useRouter();

  return (
      <Container disableGutters maxWidth={"xl"} className={classes.root}>
      <Hero/>
      <About/>
      <Container>
      <Typography variant="h4" gutterBottom style={{margin:"3rem 0", color:"#fff"}} align="left">
        Featured Campaigns:
      </Typography>
      </Container>
      <CampaignsShowcase campaigns={campaigns} searchQuery="" sortBy="percent" limit={4} cardStyle={{boxShadow:`5px 5px 10px #000`}}/>
      <Typography variant="h5" className={classes.explore} gutterBottom  align="center" onClick={()=>router.push('/campaigns')}>
        Explore More &#x27A3;
      </Typography>
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