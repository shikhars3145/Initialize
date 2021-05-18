import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
  CardMedia,
  LinearProgress,
  Box,
  Paper,
  Tab,
  Tabs,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StorySection from '../../components/StorySection';
import ValueInput from '../../components/ValueInput';
import RequestsSection from '../../components/RequestsSection';
import UpdatesSection from '../../components/UpdatesSection';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Campaign from '../../utils/Campaign';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import ShareBtn from '../../components/ShareBtn';
import minLengthValue from '../../utils/minLengthValue';
import UserContext from '../../contexts/user/user.context';
import CopyToClipboard from 'react-copy-to-clipboard';
import TransactionButton from '../../components/TransactionButton';
import correctChain from '../../utils/correctChain';
const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    paddingBottom: '2rem',
    backgroundColor:"#fff"
  },
  paper: {
    padding: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  removeTopBorderRadius:{
    borderTopLeftRadius: 0,
    borderTopRightRadius:0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '100%',
    borderRadius:"inherit"
  },
  heading: {
    margin: '3rem auto 5rem auto',
    width:"fit-content",
  },
  nameHeading:{
    //background: "linear-gradient(135deg, rgba(125, 213, 111, 0.9), rgba(40, 180, 135, 0.9))",
    color: theme.palette.primary.main,
    // padding:"1rem",
    // margin:"1rem",
    // boxDecorationBreak: "clone",
    // transform: "skewX(-12deg)"
  },
  by: {
    display: 'block',
    textAlign:"left"
  },
  icon:{ 
    padding: 2,
    position: 'relative', 
    top: '8px',
    border: `5px solid ${theme.palette.primary.main}`,
    height: 46,
    width:46,
    display:"inline-block",
    borderRadius:"50%"
  },
  progress: {
    height: '0.5rem',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '300px',
  },
  input: {
    // width: "100%",
    borderRadius: 0,
    height: '40px',
    padding: 0,
    backgroundColor:"#fff",
    border:`1px solid ${theme.palette.primary.main}`
  },
  textInput: {
    width: '60%',
  },
  typo: {
    margin: '1rem 0',
    lineHeight: '1.3rem',
  },
  info: {
    display: 'block',
    color: theme.palette.primary.main,
    fontSize: '2rem',
    lineHeight: 1,
    fontWeight:400
  },
  btn: {
    width: '35%',
    borderRadius: 0,
    height: '40px',
  },
  contriWrapper: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'space-between',
  },
  shareWrapper: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
  },
  shareButton: {
    cursor: 'pointer',
    '&:hover:not(:active)': {
      opacity: 0.75,
    },
  },
}));

export default function campaignDetails({ details, backers, updates, requests }) {
  const md = useMediaQuery(theme => theme.breakpoints.up('md'));
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contribution, setContribution] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let href;
  if (typeof window !== 'undefined') href = window.location.href;
  const shareUrl = href;
  const title = 'Support This Campaign';
  const [state, setstate] = useState({
    title: details[0],
    story: details[1],
    image: details[2],
    goal: details[3],
    funding: details[4],
    minContri: details[5],
    contractAddr: details[6],
    manager: details[7],
    balance: details[8],
    updates: details[9],
    backers: backers,
  });

  useEffect(() => {
    setstate({
      title: details[0],
      story: details[1],
      image: details[2],
      goal: details[3],
      funding: details[4],
      minContri: details[5],
      contractAddr: details[6],
      manager: details[7],
      balance: details[8],
      updates: details[9],
      backers: backers,
    });
    console.log('useEffect ran');
  }, [loading, details]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const refreshData = () => {
    console.log('refreshed');
    router.replace(router.asPath);
  };

  const contribute = async () => {
    if (!contribution) return;
    if (Number(contribution) < Number(state.minContri))
      return alert(`Atleast ${minLengthValue(state.minContri)} required to make a contribution`);
    const campaign = Campaign(state.contractAddr);
    setLoading(true);
    try {
      await campaign.methods.contribute().send({ from: user, value: contribution });
      setContribution('');
      refreshData();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.heading}>
          <Typography gutterBottom variant={md?'h3':'h4'} align='left' className={classes.nameHeading}>
            {state.title}
          </Typography>
          <Typography variant='body1' className={classes.by}>
              {"by "} 
              <span class={classes.icon}>
                <Jazzicon diameter={32} seed={jsNumberForAddress(state.manager)} />
              </span>
              {` ${state.manager.slice(0, 6)}...${state.manager.slice(-4)}`}
              <CopyToClipboard text={state.manager}>
                <IconButton size='small' style={{ position: 'relative', top: '-3px' }}>
                  <FileCopyIcon fontSize='small' />
                </IconButton>
              </CopyToClipboard>
            </Typography>
          </div>
        <Grid container spacing={5} className={classes.grid}>
          <Grid item xs={12} md={8} className={classes.gridItem}>
            <Paper className={classes.paper}>
              {/* <CardMedia className={classes.media} image='/image-preview.png' /> */}
              <CardMedia className={classes.media} image={`https://ipfs.infura.io/ipfs/${state.image}`} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper className={clsx(classes.paper,classes.removeTopBorderRadius)}>
              <LinearProgress
                variant='determinate'
                value={Math.min((Number(state.funding) / Number(state.goal))*100, 100)}
                className={classes.progress}
                color="primary"
              />
              <Typography className={classes.typo}>
                Raised <span className={classes.info}>{minLengthValue(state.funding).toUpperCase()}</span>
              </Typography>
              <Typography className={classes.typo}>
                of Goal <span className={classes.info}>{minLengthValue(state.goal).toUpperCase()}</span>
              </Typography>
              <Typography className={classes.typo}>
                by <span className={classes.info}>{state.backers} </span> contributors
              </Typography>
              <Box className={classes.contriWrapper}>
                <ValueInput
                  variant='outlined'
                  // type='number'
                  helperText={<pre>{`Min Contribution Req: \n${minLengthValue(state.minContri)}`}</pre>}
                  className={classes.textInput}
                  InputProps={{ className: classes.input }}
                  // onChange={handleContriChange}
                  setter={setContribution}
                  value={contribution}
                />
                <TransactionButton
                  variant='contained'
                  onClick={contribute}
                  color='primary'
                  className={classes.btn}
                  classes={{ root: classes.btn }}
                >
                  Contribute
                </TransactionButton>
              </Box>
              <Box className={classes.shareWrapper}>
                <FacebookShareButton url={shareUrl} quote={title} className={classes.shareButton}>
                  <FacebookIcon size={45} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} quote={title} className={classes.shareButton}>
                  <TwitterIcon size={45} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} quote={title} className={classes.shareButton}>
                  <WhatsappIcon size={45} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl} quote={title} className={classes.shareButton}>
                  <LinkedinIcon size={45} round />
                </LinkedinShareButton>
                <ShareBtn campAddr={state.contractAddr} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleTabChange}
        centered={true}
      >
        <Tab label='Story' />
        <Tab label='Updates' />
        <Tab label='Requests' />
      </Tabs>
      <Container className={classes.root}>
        {value == 0 && <StorySection story={state.story} />}
        {value == 1 && <UpdatesSection updates={state.updates} manager={state.manager} address={state.contractAddr} updateProps={updates}/>}
        {value == 2 && (
          <RequestsSection
            manager={state.manager}
            balance={state.balance}
            address={state.contractAddr}
            backers={state.backers}
            requestProps={requests}
          />
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  let campaign;
  try {
    campaign = Campaign(context.params.id);
  } catch (err) {
    return {
      notFound: true,
    };
  }
  let campaignDetails;
  let backers;
  let requests;
  let updates

  try {
    campaignDetails = await campaign.methods.getDetails().call();
    backers = await campaign.methods.approversCount().call();
    requests = await campaign.methods.getRequests().call();
    updates = await campaign.methods.getUpdates().call();
  } catch (err) {
    // console.log("invalid id")
    return {
      notFound: true,
    };
  }

  return {
    props: { details: campaignDetails, backers, updates, requests }, // will be passed to the page component as props
  };
}
