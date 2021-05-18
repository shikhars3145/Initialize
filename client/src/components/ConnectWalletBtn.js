import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React, { useContext, useRef, useEffect, useState, Children } from 'react';
import UserContext from '../contexts/user/user.context';
import web3 from '../utils/web3';
import { makeStyles } from '@material-ui/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const useStyles = makeStyles(theme => ({
  icon: {
    padding: 2,
    border: `5px solid ${theme.palette.primary.contrastText}`,
    height: 46,
    width: 46,
    borderRadius: '50%',
    marginRight: 5,
  },
  title:{
      textAlign:"center"
  },
  btn:{
      marginRight:"auto",
      marginLeft:"auto"
  }
}));

export default function ConnectWalletBtn({children,...otherProps}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
        onboarding.current = new MetaMaskOnboarding();
      }
  }, [])


  const connectWallet = () => {
    if (typeof ethereum !== 'undefined') {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setUser(web3.utils.toChecksumAddress(accounts[0]));
        })
        .catch(err => {
          console.log(err);
          alert(err.message);
        });
    } else {
      // Open Modal
      setOpen(true);
    }
  };

  const handleClose = ()=>{
      setOpen(false);
  }

  const handleOnboarding = () => {
    onboarding.current.startOnboarding();
  }

  return (
    <>
      <Button onClick={!user ? connectWallet : null} {...otherProps} style={{width:"fit-content"}}>
        {!user ? (
          'Connect Wallet'
        ) : (
            children?children:
          <>
            <span class={classes.icon}>
              <Jazzicon diameter={32} seed={jsNumberForAddress(user)} />
            </span>
            {`  ${user.slice(0, 6)}...${user.slice(-6)}`}
          </>
        )}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
        <DialogTitle className={classes.title} id='simple-dialog-title'>No Wallet Detected</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          You need to have a cryptocyrrency wallet to connect.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnboarding} className={classes.btn} color='primary'>
            Get Wallet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
