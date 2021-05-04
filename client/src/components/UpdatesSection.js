import { Typography, makeStyles, Card, CardMedia, CardContent, Button, TextField } from '@material-ui/core';
import UserContext from '../contexts/user/user.context';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Campaign from '../utils/Campaign';
import TransactionButton from './TransactionButton';
import ipfs from '../utils/ipfs';
import web3 from '../utils/web3';

const useStyles = makeStyles(theme => ({
  heading: {
    margin: '1rem auto',
  },
  noUpdates: {
    color: 'rgba(0, 0, 0, 0.26)',
    display: 'block',
    textAlign: 'center',
  },
  media: {
    width: 300,
    // height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  mediaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem',
    paddingRight: '0',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  card: {
    display: 'flex',
    marginTop: '1rem',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '1rem',
      paddingBottom: '2rem',
    },
  },
  content: {
    flexGrow: 1,
  },
  submitBtn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: '1rem',
    bottom: '0.5rem',
  },
  imgBtn: {
    marginTop: '0.5rem',
    width: 'auto',
  },
  hide: {
    display: 'none',
  },
}));

export default function UpdatesSection({ manager, address }) {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const fileInputRef = useRef();
  const [imgSrc, setImgSrc] = useState('');
  const [imgBuffer, setImgBuffer] = useState(null);
  const [loading, setloading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (user && manager.toLowerCase() == user.toLowerCase()) {
      setIsAdmin(true);
      console.log('true');
    } else {
      setIsAdmin(false);
      console.log(manager, user);
      console.log('false');
    }
  }, [user]);

  useEffect(() => {
    const getInstance = async () => {
      const campaign = Campaign(address);
      const updates = await campaign.methods.getUpdates().call();
      setUpdates(updates);
      setCampaign(campaign);
    };
    getInstance();
  }, []);

  const handleChange = e => {
    setUpdateText(e.target.value);
  };

  const handleSubmit = async () => {
    console.log('submitted');
    if (updateText === '') return alert('Give an Update text Before submitting');
    const networkId = await web3.eth.net.getId();
    const DEPLOYED_NETWORK_ID = process.env.DEPLOYED_NETWORK_ID;

    if (DEPLOYED_NETWORK_ID != networkId) return alert(`Please Change network to network id:${DEPLOYED_NETWORK_ID}`);
    // show loader in backdrop and disable background and submit button
    setloading(true);
    try {
      // send image buffer to ipfs
      let imagePath;
      if (imgBuffer) {
        const { path } = await ipfs.add(imgBuffer);
        imagePath = path;
      } else {
        imagePath = '';
      }
      console.log('uploaded');

      // create campaign from factory
      await campaign.methods.addUpdate(imagePath, updateText).send({ from: user });
      setloading(false);
      console.log('finished');
      setUpdates([...updates, [imagePath, updateText]]);
      setUpdateText('');
      setImgSrc('');
      setImgBuffer(null);
    } catch (err) {
      setloading(false);
      alert('Some error occured');
    }
  };

  const handleImage = e => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;

    const urlReader = new FileReader();
    urlReader.readAsDataURL(file);
    urlReader.onloadend = () => {
      setImgSrc(urlReader.result);
    };

    const bufferReader = new FileReader();
    bufferReader.readAsArrayBuffer(file);
    bufferReader.onloadend = () => {
      setImgBuffer(Buffer(bufferReader.result));
    };
  };

  const triggerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Typography variant='h4' color='primary' className={classes.heading}>
        Updates
      </Typography>
      {!updates.length && !isAdmin && (
        <Typography variant='h5' className={classes.noUpdates}>
          No Updates Yet
        </Typography>
      )}

      {isAdmin && (
        <Card className={classes.card}>
          <div className={classes.mediaWrapper}>
            <CardMedia className={classes.media} image={imgSrc ? imgSrc : '/image-preview.png'} />
            <input
              name='img'
              type='file'
              accept='.png, .jpg, .jpeg'
              onChange={handleImage}
              className={classes.hide}
              ref={fileInputRef}
            />
            <Button variant='text' color='primary' className={classes.imgBtn} fullWidth onClick={triggerClick}>
              {imgSrc ? 'Change Image' : 'Select Image'}
            </Button>
          </div>
          <CardContent className={classes.content}>
            <TextField multiline fullWidth rows={7} variant='outlined' value={updateText} onChange={handleChange} />
          </CardContent>
          <TransactionButton className={classes.submitBtn} onClick={handleSubmit}>
            Send Update
          </TransactionButton>
        </Card>
      )}

      {updates.map((update, idx) => (
        <Card className={classes.card} key={idx}>
          {update[0] != '' && (
            <div className={classes.mediaWrapper}>
              <CardMedia className={classes.media} image={`https://ipfs.infura.io/ipfs/${update[0]}`} />
              {/* <CardMedia className={classes.media} image='/image-preview.png' /> */}
            </div>
          )}
          <CardContent>
            <Typography variant='subtitle1'>{update[1]}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
