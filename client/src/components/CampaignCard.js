import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Typography, Button, Divider } from '@material-ui/core';
import { useRouter } from 'next/router'
import ShareBtn from './ShareBtn'
import minLengthValue from '../utils/minLengthValue'

const useStyles = makeStyles(theme => ({
  //   root: {
  //     width: "100%",
  //     height:"100%"
  //   },
  root: {
    maxWidth: "100%",
    height:"100%",
    display: 'flex', 
    justifyContent: 'space-between', 
    flexDirection: 'column'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  share: {
    marginLeft: 'auto',
  },
  content:{
      textAlign: "center",
      color:"#777",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around",
      paddingBottom:0
  },
  btn:{
    "&:hover":{
      color:theme.palette.secondary.main
    }
  }
}));

export default function CampaignCard({ campaign,style }) {
  const classes = useStyles();
  const router = useRouter();

  const minLengthContri = minLengthValue(campaign[5]);

  const gotoCampaign = () => {
    router.push(`/campaigns/${campaign[6]}`);
  };

  return (
    <Card className={classes.root} style={style}>
      <CardHeader title={campaign[0]} />
      <CardMedia className={classes.media} image={`https://ipfs.infura.io/ipfs/${campaign[2]}`} />
      <CardContent className={classes.content}>
        <Typography variant='body1'>{((campaign[4] / campaign[3]) * 100).toFixed() + '%'} Funded</Typography>
        <Divider/>
        <Typography variant='body2'>
          Min. Contribution Req.: {minLengthContri}
        </Typography>
        <Divider/>
      </CardContent>
      <CardActions disableSpacing>
        <Button className={classes.btn} onClick={gotoCampaign}>Learn More...</Button>
        <ShareBtn campAddr={campaign[6]} className={classes.share}/>
        {/* <IconButton aria-label='share' className={classes.share}>
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
