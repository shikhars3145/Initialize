import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router'
import TransactionButton from './TransactionButton';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    btn: {
      width: "60%",
      marginTop: "3rem"
    },
    container:{
        textAlign: "center",
        paddingTop: "3rem",
        marginBottom: "3rem"

    },
    desc: {
        marginTop: "5rem"
    }
  }));

export default function Hero() {
    const classes = useStyles();
    const router = useRouter();

    const redirectToCreate = ()=>{
        router.push('/createNewCampaign');
    }

    return (
        <Container className={classes.container}>
            <Typography variant="h2">
                INITIALIZE
            </Typography>
            <Typography variant="h6" className={classes.desc}>
                INITIALIZE is distributed crowdfunding platform which allows individuals 
                (and nonprofits!) to raise money for nearly any kind of cause or project. 
                INITIALIZE is a blockchain based crowdfunding platform, which ensures lower 
                transaction fees, enhanced security, and transparency. Our platform also prevents 
                contributors from getting scammed as the fundraiser has to initiate request 
                for taking out funds from the campain, and each request is voted upon 
                by the contributors giving contributors control over how funds are spent.
            </Typography>
            <TransactionButton className={classes.btn} size="large" color="primary" variant="contained" onClick={redirectToCreate}>Create A Campaign</TransactionButton>
        </Container>
    )
}
