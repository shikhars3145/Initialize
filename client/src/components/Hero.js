import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-scroll'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
    btn: {
      marginTop: "3rem",
      padding: "1rem 2rem",
      fontSize: "1.5rem",
      border: "2px solid #fff",
      borderRadius:"0",
      outline: "2px solid #fff",
      outlineOffset: "3px",
      '&:hover':{
          backgroundColor:"#fff",
          borderColor:theme.palette.primary.main,
          outlineColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          transition: "all 0.2s linear"
      }
    },
    hero:{
        minHeight:"calc(100vh - 64px)",
        // background: "linear-gradient(135deg, rgba(255, 0, 150, 0.3), rgba(0, 0, 100, 0.3)), url(/bg.jpg)",
        background: "linear-gradient(135deg, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85)), url(/bg2.jpg)",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "space-around",
        color: "#fff"
    },
    heading:{
        fontWeight:500,
    },
    container:{
        textAlign: "center",
        paddingTop: "3rem",
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-around",
        alignItems:"center",
    },
    desc: {
        // marginTop: "5rem",
        marginLeft:"2rem",
        marginRight:"2rem",
        marginBottom:"5rem",
        textTransform: "uppercase"
    },
    arrow:{
        marginTop:"4rem",
        cursor:"pointer",
        '&:hover':{
            transform:"translateY(10px) scale(1.05)",
            transition: "all 0.2s linear ",
            opacity:"0.8"
        }
    }
  }));

export default function Hero() {
    const classes = useStyles();
    const router = useRouter();

    const redirectToCreate = ()=>{
        router.push('/createNewCampaign');
    }

    return (
        <div className={classes.hero}>
        <Container className={classes.container}>
            <Typography variant="h2" className={classes.heading}>
                INITIALIZE
            </Typography>
            <Typography variant="h6" className={classes.desc}>
                A Blockchain based crowdfunding platform 
            </Typography>
            <Button className={classes.btn} size="large" color="primary" variant="contained" onClick={redirectToCreate}>Create A Campaign</Button>
            <Link className={classes.arrow}  to="about" smooth={true}><KeyboardArrowDownIcon style={{fontSize:"7rem"}}/></Link>
        </Container>
        </div>
    )
}
