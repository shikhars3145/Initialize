import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { Typography, Button } from '@material-ui/core';
import web3 from '../utils/web3';
import { useRouter } from 'next/router'


const useStyles = makeStyles(theme => ({
  //   root: {
  //     width: "100%",
  //     height:"100%"
  //   },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  share: {
    marginLeft: 'auto',
  },
}));

export default function CampaignCard({ campaign }) {
  const classes = useStyles();
  const router = useRouter();

  const minContriWei = campaign[5] + ' wei';
  const minContriGwei = Number(web3.utils.fromWei(`${campaign[5]}`, 'gwei')).toPrecision() + ' gwei';
  const minContriEth = Number(web3.utils.fromWei(`${campaign[5]}`, 'ether')).toPrecision() + ' eth';

  const options = [minContriWei,minContriGwei,minContriEth];
  const minLengthContri = options.reduce((a,b)=> a.length<b.length ? a : b);

  const gotoCampaign = () => {
    router.push(`/campaigns/${campaign[6]}`);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={campaign[0]} />
      <CardMedia className={classes.media} image={`https://ipfs.infura.io/ipfs/${campaign[2]}`} />
      <CardContent>
        <Typography variant='body1'>{((campaign[4] / campaign[3]) * 100).toFixed() + '%'} Funded</Typography>
        <Typography variant='body2'>
          Min. Contribution Req.: {minLengthContri}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={gotoCampaign}>Learn More...</Button>
        <IconButton aria-label='share' className={classes.share}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
