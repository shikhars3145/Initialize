import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from '../contexts/user/user.context';
import web3 from '../utils/web3';
import { makeStyles } from '@material-ui/core';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const useStyles = makeStyles(theme => ({
    icon:{ 
        padding: 2,
        border: `5px solid ${theme.palette.secondary.main}`,
        height: 46,
        width:46,
        borderRadius:"50%",
        marginRight:5
      },
}));

export default function TransactionButton({ children, onClick, type, ...btnProps }) {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

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
      alert('No Wallet Detected Please Consider Using Metamask');
    }
  };

  return (
    <Button style={{width:"fit-content"}} onClick={user ? onClick : connectWallet} type={user ? type : 'button'} {...btnProps}>
      {user ? (
        children ? (
          children
        ) : (
          <>
            <span class={classes.icon}>
              <Jazzicon diameter={32} seed={jsNumberForAddress(user)} />
            </span>
            {`  ${user.slice(0, 6)}...${user.slice(-6)}`}
          </>
        )
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}
