import { Container, Typography, Grid } from '@material-ui/core';
import React from 'react';

export default function About() {
  return (
    <Container>
      <Typography variant='h2' color="secondary" gutterBottom style={{ marginTop: '2rem',marginBottom:"1rem" }} align='center'>
        ABOUT
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} md={8}>
        <Typography variant='h5' align='left' style={{color:"#fff"}}>
            INITIALIZE is distributed crowdfunding platform which allows individuals (and nonprofits!) to raise money
            for nearly any kind of cause or project. INITIALIZE is a blockchain based crowdfunding platform, which
            ensures lower transaction fees, enhanced security, and transparency. Our platform also prevents contributors
            from getting scammed as the fundraiser has to initiate request for taking out funds from the campain, and
            each request is voted upon by the contributors giving contributors control over how funds are spent.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <img style={{width:"100%",height:"auto"}} src='./about.svg'/>
        </Grid>
      </Grid>
    </Container>
  );
}
