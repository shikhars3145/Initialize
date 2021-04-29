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

export default function allCampaignPage() {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('oldest');
  const camps = [
    ['Release The Snyder Cut', 'Some story', 'brokeimage', 500, 700, 4000000000000, '0x843468468684'],
    ['Some Interesting name', 'Some story', 'brokeimage', 1800, 700, 5278000000, '0x843468468684'],
    ['Release The Snyder Verse', 'Some story', 'brokeimage', 500, 1800, 40000000000010, '0x843468468684'],
    ['Boring Company', 'Some story', 'brokeimage', 5100, 7200, 40000000000010, '0x843468468684'],
    ['Dunkin Donut', 'Some story', 'brokeimage', 900, 500, 40000000000010, '0x843468468684'],
    ['Nolan is genius', 'Some story', 'brokeimage', 500, 1200, 40000000000010, '0x843468468684'],
    ['Oxygen Help', 'Some story', 'brokeimage', 100, 700, 40000000000010, '0x843468468684'],
    ['Need Medicine', 'Some story', 'brokeimage', 700, 700, 40000000000010, '0x843468468684'],
  ];

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
      <CampaignsShowcase campaigns={camps} searchQuery={search} sortBy={sortBy} />
    </Container>
  );
}
