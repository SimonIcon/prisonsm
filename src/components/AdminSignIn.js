import { TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import adminCredential from '../api/adminCredential'

const useStyles = makeStyles((theme) => ({
  input: {

    paddingTop: 5,
    paddingBottom: 5,
    width: "80%"
  },
  adminSignInBtn: {

    paddingTop: 5,
    paddingBottom: 5,
    width: "80%",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    borderRadius: 20,
    marginTop: 10,

  },
  container: {
    justifyContent: "flex-start",
    paddingTop: "10px",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    textDecorationLine: "underline",
    paddingBottom: 10,
    marginBottom: 10,
  },
  error: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
    color: "red",

  },
  success: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    marginBottom: 20,
    textTransform: "capitalize",

  }


}))
const AdminSignUp = ({ setUser, setActive }) => {
  const classes = useStyles()
  const [emailOne, setEmail] = useState('');
  const [passwordOne, setpassword] = useState('');
  const [error, setError] = useState('');
  const [comment, setComment] = useState('')

  const handleSignIn = () => {
    adminCredential.map((x) => {
      if (passwordOne === x.password && emailOne === x.email) {
        setComment("login success")
        setTimeout(() => {
          setActive(1);
          setUser(1)

        }, 2000);
      } else {
        setError("No such admin, check your email or password");
        setTimeout(() => {
          setEmail("");
          setpassword("")
          setError("")
        }, 1000)
      }
    })

  }
  return (
    <div className={classes.container}>
      <Typography className={classes.title}>admin login only</Typography>
      {
        comment ? <Typography className={classes.success}>{comment}</Typography> :
          <>{error ? <Typography className={classes.error}>{error}</Typography> : null}</>
      }
      <TextField
        variant='outlined'
        placeholder='enter your email'
        required
        type='email'
        value={emailOne}
        onChange={(event) => setEmail(event.target.value)}
        className={classes.input}
        label="enter your email"
        autoComplete='false'
      /><br /><br />
      <TextField
        variant='outlined'
        placeholder='Enter your password'
        required
        type='password'
        value={passwordOne}
        onChange={(event) => setpassword(event.target.value)}
        className={classes.input}
        label="Enter your password"
        autoComplete='false'
      />
      <br />
      <button className={classes.adminSignInBtn} onClick={() => {
        handleSignIn()
      }}>sign in</button>


    </div>
  )
}

export default AdminSignUp