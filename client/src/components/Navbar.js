import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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
          </Toolbar>
        </AppBar>
      </div>
    )
}
