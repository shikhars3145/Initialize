import {
  Container,
  Divider,
  TextField,
  Typography,
  FormControl,
  Select,
  makeStyles,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import CampaignsShowcase from '../../components/CampaignShowcase';
import factory from '../../utils/factory';
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '3rem',
    textAlign: 'center',
  },
  input: {
    margin: '0 1rem',
    minWidth: 120,
  },
  heading: {
    marginBottom: '5rem',
  },
}));

export default function allCampaignPage({campaigns}) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('oldest');

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleSelect = e => {
    setSortBy(e.target.value);
  };

  return (
    <Container className={classes.root}>
      <Typography variant='h5' className={classes.heading}>
        Find Campaigns Having Name{' '}
        <TextField onChange={handleSearch} value={search} placeholder='Anyname' className={classes.input} /> And Sort
        them by
        <FormControl>
          <Select value={sortBy} onChange={handleSelect} className={classes.input}>
            <MenuItem value={'oldest'}>Date Launched</MenuItem>
            <MenuItem value={'latest'}>Latest First</MenuItem>
            <MenuItem value={'alpha'}>Alphabetically</MenuItem>
            <MenuItem value={'funds'}>Funds Raised</MenuItem>
            <MenuItem value={'percent'}>% Funded</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <CampaignsShowcase campaigns={campaigns} searchQuery={search} sortBy={sortBy} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  if(!factory) return {props:{campaigns:[]}}
  const campaigns = await factory.methods.getDeployedCampaignsDetails().call();
  return {
    props: {campaigns}, // will be passed to the page component as props
  }
}