import React, {useState} from 'react'
import {IconButton, Snackbar} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function ShareBtn({campAddr, ...other}) {
    const [open, setopen] = useState(false);

    const handleClose = ()=>{
        setopen(false);
    }
    const handleClick = ()=>{
        setopen(true);
    }
    let host;
    if(typeof window !=='undefined') host = window.location.host;
    return (
        <>
        <CopyToClipboard onCopy={handleClick} text={`${host}/campaigns/${campAddr}`}>
        <IconButton aria-label='share' {...other}>
        <ShareIcon />
        </IconButton>
          </CopyToClipboard>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Campaign Link Copied to Clipboard"/>
        </>
    )
}
