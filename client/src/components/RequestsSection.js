import {
  Box,
  Button,
  Card,
  CardHeader,
  makeStyles,
  TextField,
  Typography,
  InputAdornment,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Chip
} from '@material-ui/core';
import ValueInput from './ValueInput';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/user/user.context';
import Campaign from '../utils/Campaign';
import web3 from '../utils/web3';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import minLengthValue from '../utils/minLengthValue';


const useStyles = makeStyles(theme => ({
  heading: {
    margin: '1rem auto',
  },
  balance: {
    textAlign: 'right',
  },
  noRequests: {
    color: 'rgba(0, 0, 0, 0.26)',
    display: 'block',
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    marginTop: '1rem',
    position: 'relative',
    padding: '1rem',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      paddingBottom: '2rem',
    },
  },
  subheader:{
      marginTop:"1rem"
  },
  reqDesc: {
    flexGrow: 1,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '1rem',
      marginLeft: 0,
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
  hide: {
    display: 'none',
  },
  boxInput: {
    marginBottom: '1rem',
  },
  input: {
    // padding:0,
    width:"100%",
    marginTop:"1rem"
  },
  root:{
    display:"flex",
    height:"100%",
    flexDirection:"column"
  }
}));

export default function RequestsSection({ manager, address, balance, backers }) {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [campaign, setCampaign] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isContributor, setIsContributor] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [reqDesc, setReqDesc] = useState('');
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState([]);
  const [balanceState, setBalanceState] = useState(balance);

  useEffect(() => {
    const getInstance = async () => {
      const campaign = Campaign(address);
      const requests = await campaign.methods.getRequests().call();
      setRequests(requests);
      setCampaign(campaign);
    };

    getInstance();
  },[]);

  useEffect(() => {
    if (user && manager == user) {
      setIsAdmin(true);
      console.log('true');
    } else {
      setIsAdmin(false);
      console.log(manager, user);
      console.log('false');
    }

    console.log("check contributor",backers);
    if (campaign && user) {
      console.log("inside if")
      campaign.methods
        .approvers(user)
        .call()
        .then(isContributorLocal => setIsContributor(isContributorLocal));
    }
  }, [user,backers,campaign]);

  useEffect(() => {
    if(isContributor && requests.length && campaign)
    {
      const unresolvedArr = [];
      requests.forEach((request, idx)=>{
        const unresolved = campaign.methods.approvals(user, idx).call();
        unresolvedArr.push(unresolved);
      })
      Promise.all(unresolvedArr).then(localApproved=>setApproved(localApproved));
      console.log("setting approved")
    }
  }, [isContributor,user])

  useEffect(()=>{
    setBalanceState(balance);
  },[balance])

  const submitRequest = async e => {
    e.preventDefault();
    const validAddr = web3.utils.isAddress(receiver);
    if (!validAddr) return alert('Receiver is not a valid address');
    if(!amount) return;
    try {
      setLoading(true);
      await campaign.methods.createRequest(reqDesc, amount.toString(), receiver).send({ from: user });
      setRequests([...requests, [reqDesc, amount, receiver, false, 0]]);
      setReqDesc('');
      setAmount(1);
      setReceiver('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReceiver = e => {
    setReceiver(e.target.value);
  };

  const handleAmt = e => {
    setAmount(e.target.value);
  };

  const handleDesc = e => {
    setReqDesc(e.target.value);
  };

  const handleApprove=async(e)=>{
    const requestNo = e.currentTarget.dataset.idx;
    console.log(requestNo);
    try{
      setLoading(true);
      await campaign.methods.approveRequest(requestNo).send({from:user});
      const tempReq = JSON.parse(JSON.stringify(requests));
      tempReq[requestNo][4]=Number(tempReq[requestNo][4])+1;
      const tempApproved = [...approved];
      tempApproved[requestNo]=true;
      setRequests(tempReq);
      setApproved(tempApproved);
    }
    catch(err){
      alert(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  const handleFinalise=async(e)=>{
    const requestNo = e.currentTarget.dataset.idx;
    if(requests[requestNo][4]<=backers/2) return alert("Not enough approvals");
    console.log(requestNo);
    try{
      setLoading(true);
      await campaign.methods.finalizeRequest(requestNo).send({from:user});
      const tempReq = JSON.parse(JSON.stringify(requests));
      tempReq[requestNo][3]=true;
      setRequests(tempReq);
      setBalanceState(Number(balanceState)-Number(requests[requestNo][1]));
    }
    catch(err){
      alert(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Typography variant='h4' color='primary' className={classes.heading}>
        Requests
      </Typography>
      <Typography variant='h5' color='primary' className={classes.balance}>
        Campaign Balance: {minLengthValue(balanceState).toUpperCase()}
      </Typography>
      {!requests.length && !isAdmin && (
        <Typography variant='h5' className={classes.noRequests}>
          No Requests Yet
        </Typography>
      )}
      {isAdmin&&<form onSubmit={submitRequest}>
        <Card className={classes.card}>
          <TextField
            label='Request Description'
            required
            multiline
            rows={6}
            variant='outlined'
            className={classes.reqDesc}
            value={reqDesc}
            onChange={handleDesc}
          />
          <Box className={classes.box}>
            <ValueInput
              label='Amount'
              required
              size='small'
              // type='number'
              InputProps={{ minimum: 0 }}
              variant='outlined'
              className={classes.boxInput}
              setter={setAmount}
            />
            <TextField
              label='Receiver'
              required
              size='small'
              variant='outlined'
              className={classes.boxInput}
              value={receiver}
              onChange={handleReceiver}
            />
            <Button variant='contained' type='submit' color='primary'>
              Create Request
            </Button>
          </Box>
        </Card>
      </form>
      }
      <Grid container spacing={3} style={{marginTop:"3rem"}}>
        {requests.map((request,idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card className={classes.root}>
        <CardHeader classes={{subheader:classes.subheader}} title={`Request #${idx+1}`} subheader={<>{approved[idx]&&<Chip label="Approved" />} {request[3]&&<Chip label="Processed" />}</>}/>
              <CardContent>
                <Typography>Description</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {request[0]}
                </Typography>
                <TextField
                  variant='outlined'
                  label='Amount'
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={minLengthValue(request[1])}
                  size='small'
                  className={classes.input}
                />
                
                <TextField
                  variant='outlined'
                  label='Receiver'
                  type='text'
                  size='small'
                  value={request[2]}
                  className={classes.input}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <CopyToClipboard text={request[2]}>
                        <IconButton>
                          <FileCopyIcon />
                        </IconButton>
                        </CopyToClipboard>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <TextField
                  variant='outlined'
                  label='Approved By'
                  InputProps={{
                    readOnly: true,
                  }}
                  value={`${request[4]}/${backers}`}
                  size='small'
                  className={classes.input}
                />
              </CardContent>
              <CardActions disableSpacing style={{marginTop:"auto"}}>
                {isContributor&&<Button data-idx={idx} color='primary' variant='contained' onClick={handleApprove} disabled={loading||approved[idx]||request[3]}>
                  Approve
                </Button>}
                {isAdmin&&<Button data-idx={idx} color='primary' variant='contained' onClick={handleFinalise} style={{ marginLeft: 'auto' }} disabled={loading||request[3]}>
                  Finalise
                </Button>}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
