import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme)=>({
    heading:{
        margin: "1rem auto"
    },
    story:{
        whiteSpace: "pre-line"
    }
}))

export default function StorySection({story}) {
    console.log("story rerendered");
    const classes = useStyles();
    return (
        <>
        <Typography variant="h4" color="primary" className={classes.heading}>
            Story
        </Typography>
        <Typography className={classes.story} variant="body1" align="justify">

            {story}

        </Typography>
        </>
    )
}
