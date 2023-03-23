import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdminSignIn from './AdminSignIn';
import UserSignIn from './UserSignIn';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    [theme.breakpoints.up('xs')]: {
      height: "80%",
      width: "80%",
      top: "10%",
      left: "10%",
    },
    [theme.breakpoints.up('sm')]: {
      height: "80%",
      width: "60%",
      top: "10%",
      left: "20%",
    },
    [theme.breakpoints.up('md')]: {
      height: "70%",
      width: "40%",
      top: "10%",
      left: "20%",

    },
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "palegreen",
    overflowY: "auto",

  }

}))

const Authentication = ({ setActive, setUser }) => {
  const classes = useStyles();
  const [value, setValue] = useState('2');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} className={classes.container}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="user" value="2" />
            <Tab label="admin" value="1" />

          </TabList>
        </Box>
        <TabPanel value="1"><AdminSignIn setUser={setUser} setActive={setActive} /></TabPanel>
        <TabPanel value="2"><UserSignIn setActive={setActive} setUser={setUser} /></TabPanel>


      </TabContext>
    </Box>
  )
}

export default Authentication