import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import {chainMap} from '../utils/correctChain';

const useStyles = makeStyles((theme)=>({
    alert:{
        position:"sticky",
        bottom: "0.5rem",
        left:0,
        right:0,
        width:"95%",
        display:"flex",
        justifyContent:"center",
        marginRight:"auto",
        marginLeft:"auto"
    }
}))

export default function WrongChainAlert() {
    const classes = useStyles();
    return (
        <Alert className={classes.alert} elevation={6} variant="filled" severity="error">
            You Are On the wrong network, Please Change to {chainMap[process.env.DEPLOYED_NETWORK_ID]} Network in Metamask.
        </Alert>
    )
}
