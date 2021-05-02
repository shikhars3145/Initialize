import { Typography } from '@material-ui/core'
import React from 'react'

export default function StorySection({story}) {
    return (
        <>
        <Typography variant="h5">
            Story
        </Typography>
        <Typography variant="body1" align="justify">
        <pre>
            {story}
        </pre>
        </Typography>
        </>
    )
}
