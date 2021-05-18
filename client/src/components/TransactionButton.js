import React, { useContext, useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from '../contexts/user/user.context';
import web3 from '../utils/web3';
import { makeStyles,Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress } from '@material-ui/core';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import correctChain from '../utils/correctChain';
import MetaMaskOnboarding from '@metamask/onboarding';
import ConnectWalletBtn from './ConnectWalletBtn';
import LoadingContext from '../contexts/loading/loading.context';

const useStyles = makeStyles(theme => ({
      title:{
        textAlign:"center"
    },
    btn:{
        marginRight:"auto",
        marginLeft:"auto"
    }
}));

export default function TransactionButton({ connect,children, onClick, type, ...btnProps }) {
  const { user, setUser } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openGetWalletModal, setOpenGetWalletModal] = useState(false);
  const onboarding = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (!onboarding.current) {
        onboarding.current = new MetaMaskOnboarding();
      }
  }, [])

  useEffect(()=>{
    if(user) setOpenConnectModal(false);
  },[user])

  const txnOnclick = async(e)=> {
    if(!onClick) return;
    const event={...e};
    const isCorrectChain = await correctChain();
    if(!isCorrectChain) return;
    setLoading(true);
    await onClick(event);
    setLoading(false);
  }

  const connectWallet = () => {
    if (typeof ethereum !== 'undefined') {
      // show connect modal
      setOpenConnectModal(true);
    } else {
      // show get wallet modal
      setOpenGetWalletModal(true);
    }
  };

  const handleClose = ()=>{
    setOpenConnectModal(false);
    setOpenGetWalletModal(false);
}

const handleOnboarding = () => {
  onboarding.current.startOnboarding();
}

  return (
      <>
    <Button style={{width:"fit-content"}} onClick={user ? txnOnclick : connectWallet} type={user ? type : 'button'} disabled={loading} {...btnProps}>
        {loading?
        <>
        Processing
        <CircularProgress size={20} color="inherit" style={{marginLeft:"5px"}} />
        </>
        :children}
    </Button>
    
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={openGetWalletModal}>
        <DialogTitle className={classes.title} id='simple-dialog-title'>No Wallet Detected</DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
            You need to have a cryptocyrrency wallet to connect and perform this action.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleOnboarding} className={classes.btn} color='primary' variant="contained">
                Get Wallet
            </Button>
        </DialogActions>
    </Dialog>

    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={openConnectModal}>
        <DialogTitle className={classes.title} id='simple-dialog-title'>Wallet Connection Required</DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
            To perform this action you need to connect your wallet.
            </Typography>
        </DialogContent>
        <DialogActions>
            <ConnectWalletBtn variant="contained" color='primary' disabled={!!user} className={classes.btn} autoFocus> Connected </ConnectWalletBtn>
        </DialogActions>
    </Dialog>
  </>
  );
}
