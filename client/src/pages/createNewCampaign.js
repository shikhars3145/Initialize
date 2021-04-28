import { Container, Typography, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core';
import React, { useState, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../contexts/user/user.context';
import TransactionButton from '../components/TransactionButton';
import ipfs from '../utils/ipfs';
import factory from '../utils/factory.js';
import web3 from '../utils/web3'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    paddingBottom: '2rem',
    paddingTop: '2rem',
  },
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
  },
  input: {
    marginBottom: '2rem',
  },
  hide: {
    display: 'none',
  },
  image: {
    width: '100%',
    height: '300px',
    display: 'block',
    margin: '1rem auto',
  },
  imageWrapper: {
    marginBottom: '2rem',
    width: '100%',
    margin: '1rem auto',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display:"flex",
    flexDirection: "column",
  },
  backDropContent:{
    marginBottom: "3rem"
  }
}));

export default function createNewCampaign() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const fileInputRef = useRef();
  const [imgSrc, setImgSrc] = useState('');
  const [state, setstate] = useState({});
  const [backDropOpen, setbackDropOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [imgBuffer, setImgBuffer] = useState(null);
  const [receipt, setReceipt] = useState(null)
  const router = useRouter();

  const triggerClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({...state, [name]:value});
  };

  const handleImage = e => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    if(!file) return;

    const urlReader = new FileReader();
    urlReader.readAsDataURL(file);
    urlReader.onloadend = () => {
      setImgSrc(urlReader.result);
    };

    const bufferReader = new FileReader();
    bufferReader.readAsArrayBuffer(file);
    bufferReader.onloadend = ()=>{
      setImgBuffer(Buffer(bufferReader.result));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!imgBuffer) return alert("Please Select An Image for your Campaign");
    // console.log(state);

    const networkId = await web3.eth.net.getId();
    const DEPLOYED_NETWORK_ID = process.env.DEPLOYED_NETWORK_ID;
    // console.log(typeof DEPLOYED_NETWORK_ID);
    // console.log(typeof networkId);

    if(DEPLOYED_NETWORK_ID != networkId) return alert(`Please Change network to network id:${DEPLOYED_NETWORK_ID}`);
    // show loader in backdrop and disable background and submit button
    setbackDropOpen(true);
    setloading(true);
    try{
    // send image buffer to ipfs
    const {path} = await ipfs.add(imgBuffer);
    // create campaign from factory
    const receipt = await factory.methods.createCampaign(state.title, state.story, path, state.minContri, state.goal).send({from:user});
    // show transaction hash in backdrop with a Take me to campaign button
    setloading(false);
    console.log(receipt);
    setReceipt(receipt);
    }
    catch(err){
    setbackDropOpen(false);
    setloading(false);
    alert("Some error occured");
    }
  };

  const gotoCampaign = ()=>{
    router.push(`/${receipt.events.campaignDeployed.returnValues[0]}`);
    // console.log(receipt.events.campaignDeployed.returnValues[0]);
  }

  return (
    <>
    <Container className={classes.root}>
      <Typography variant='h5'>Fill out the form below to start your campaign.</Typography>
      <form className={classes.form} onSubmit={handleSubmit} autoComplete='off'>
        <TextField name='title' label='Title' fullWidth className={classes.input} required onChange={handleChange} value={state.title || ""}/>

        <TextField name='story' label='Story' multiline rows={6} fullWidth className={classes.input} required onChange={handleChange} value={state.story || ""}/>
        <div className={classes.imageWrapper}>
          <Typography variant='h6' align='left'>
            Select Campaign Image
          </Typography>

          <img id='preview' src={imgSrc ? imgSrc : '/image-preview.png'} className={classes.image} />

          <input
            name='img'
            type='file'
            accept='.png, .jpg'
            onChange={handleImage}
            className={classes.hide}
            ref={fileInputRef}
          />

          <Button variant='contained' color='primary' fullWidth onClick={triggerClick}>
          {imgSrc?"Change Image":"Select Image"}
          </Button>
        </div>
        <TextField
          name='minContri'
          fullWidth
          InputProps={{
            inputProps: {
              min: 1,
              type: 'number',
              required: true,
            },
          }}
          label='Minimum Contribution Value'
          helperText='Minimum wei a contributer must contribute'
          className={classes.input}
          required
          onChange={handleChange} value={state.minContri || ""}
        />
        <TextField
          name='goal'
          label='Goal'
          fullWidth
          InputProps={{ inputProps: { min: 1, type: 'number' } }}
          className={classes.input}
          required
          onChange={handleChange} value={state.goal || ""}
        />
        <TextField
          name='fundraiser'
          label='Fundraiser'
          fullWidth
          value={user ? user : 'Wallet Not Connected'}
          InputProps={{ readOnly: true }}
          className={classes.input}
        />
        
          <TransactionButton fullWidth type="submit">
            Create Campaign
          </TransactionButton>
      </form>
    </Container>
    <Backdrop className={classes.backdrop} open={backDropOpen}>
      {
        loading&&
        <>
        <Typography variant="h4" className={classes.backDropContent}>
          Please wait while we process your transaction
        </Typography>
      
        <CircularProgress color="primary" size="4rem"/>
        </>
      }
      {
        receipt&&
        <>
        <Typography variant="h4" className={classes.backDropContent}>
          Transaction Successfull
        </Typography>
  
        <Typography variant="h6" className={classes.backDropContent}>
          Txn hash: {receipt.transactionHash}
        </Typography>
        <Button variant="contained" color="primary" onClick={gotoCampaign}>Goto Campaign</Button>
        </>
      }
    </Backdrop>
  </>
  );
}
