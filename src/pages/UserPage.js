import { Box } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { PrisonContext } from '../api/context'
import NotVerified from '../wardenDashboard/NotVerified'
import Verified from '../wardenDashboard/Verified'

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh"
  },
}))

const UserPage = ({ setActive }) => {
  const classes = useStyles();
  const { user } = useContext(PrisonContext)
  return (
    <Box className={classes.container}>
      {user.status === "persive" ? <NotVerified user={user} /> : <Verified user={user} setActive={setActive} />}
    </Box>




  )
}

export default UserPage