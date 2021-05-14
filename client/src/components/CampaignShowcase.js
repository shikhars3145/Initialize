import { Container, Grid,Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import CampaignCard from './CampaignCard'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    showcaseContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: "2rem"
    },
    heading:{
        marginBottom: "2rem"
    },
    gridCell:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    link:{
        textDecoration: 'none',
        width:"100%",
        height:"100%"
    }
  }));

const sortFunc = (sortBy,filtered) =>{
    if(sortBy==="latest") return filtered.reverse();
    if(sortBy==="funds") return filtered.sort((a,b)=>a[4]-b[4]);
    if(sortBy==="percent") return filtered.sort((a,b)=>(b[4]/b[3])-(a[4]/a[3]));
    if(sortBy==="alpha") return filtered.sort((a,b)=>(a[0].toLowerCase()<b[0].toLowerCase()?-1:1));
    return filtered;
}

export default function CampaignsShowcase({campaigns, limit, sortBy, searchQuery}) {
    const classes = useStyles();
    if(!searchQuery) searchQuery="";
    const filtered = campaigns.filter(campaign => campaign[0].toLowerCase().includes(searchQuery.toLowerCase()));
    const sorted = sortFunc(sortBy,filtered);
    const limited = sorted.slice(0,limit);
    

    return (
        <Container className={classes.showcaseContainer}>
        <Grid container spacing={3} >
            {
                limited.map((campaign, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx} className={classes.gridCell}>
                            <CampaignCard campaign={campaign} />
                    </Grid>
                ))
            }
        </Grid>
        </Container>
    )
}
