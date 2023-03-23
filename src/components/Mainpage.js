import React from 'react'
import AdminPage from '../pages/AdminPage'
import UserPage from '../pages/UserPage'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  conatiner: {
    width: "100vw",
    height: "100vh"
  }
}))

const Mainpage = ({ user }) => {

  return (
    <div>
      {
        user ? <AdminPage /> : <UserPage />
      }
    </div>
  )
}

export default Mainpage