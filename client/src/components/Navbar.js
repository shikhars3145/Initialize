import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import TransactionButton from './TransactionButton';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import ConnectWalletBtn from './ConnectWalletBtn';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btn:{
        color:'#fff'
    }
  }));

export default function Navbar() {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
                <Typography variant="h6" className={classes.title} style={{cursor:"pointer"}} onClick={()=>router.push('/')}>
                INITIALIZE
                </Typography>
                <Typography variant="body1" style={{cursor:"pointer",margin:"0 1rem"}} onClick={()=>router.push('/campaigns')}>
                CAMPAIGNS
                </Typography>
                <ConnectWalletBtn className={classes.btn} variant="outlined"/>
          </Toolbar>
        </AppBar>
      </div>
    )
}
