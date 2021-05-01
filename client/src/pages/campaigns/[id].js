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
} from '@material-ui/core';
import React from 'react';

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

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    paddingBottom: '2rem',
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '100%',
  },
  heading: {
    margin: '3rem 0 3rem',
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
  shareButton:{
    cursor: "pointer",
    '&:hover:not(:active)':{
        opacity:0.75
    }
  }
}));

export default function campaignDetails() {
  const classes = useStyles();
  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  return (
    <Container className={classes.root}>
      <Typography variant='h4' align='center' className={classes.heading}>
        TITLE HERE
      </Typography>
      <Grid container spacing={5} className={classes.grid}>
        <Grid item xs={12} md={8} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <CardMedia className={classes.media} image='/image-preview.png' />
            {/* <CardMedia className={classes.media} image={`https://ipfs.infura.io/ipfs/${campaign[2]}`} /> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <LinearProgress variant='determinate' value={10} className={classes.progress} />
            <Typography className={classes.typo}>
              Raised <span className={classes.info}>FUNDS HERE ETH</span>
            </Typography>
            <Typography className={classes.typo}>
              of Goal <span className={classes.info}>GOAL HERE ETH</span>
            </Typography>
            <Typography className={classes.typo}>
              by <span className={classes.info}>BACKERS HERE </span> contributors
            </Typography>
            <Box className={classes.contriWrapper}>
              <TextField
                variant='outlined'
                helperText={<pre>{`Min Contribution Req: \nSOME VALUE HERE ETH`}</pre>}
                className={classes.textInput}
                InputProps={{ className: classes.input }}
              />
              <Button variant='contained' color='primary' className={classes.btn} classes={{ root: classes.btn }}>
                Contribute
              </Button>
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
                <ShareBtn campAddr={"CAMPAIGN ADDRESS HERE"}/>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}
