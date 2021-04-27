import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import TransactionButton from './TransactionButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btn:{
        width: '10rem',
        color:'#fff'
    }
  }));

export default function Navbar() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
                <Typography variant="h6" className={classes.title}>
                INITIALIZE
                </Typography>
                <TransactionButton className={classes.btn} variant="outlined"/>
          </Toolbar>
        </AppBar>
      </div>
    )
}
