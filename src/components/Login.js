import { Button, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { makeStyles } from '@mui/styles'
import { PrisonContext } from '../api/context'
import { Dialog } from '@mui/material'



const useStyles = makeStyles((theme) => ({
  input: {
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    width: "80%"
  },
  onFormSwitch: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  loginBtn: {
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
    marginLeft: 10,
    marginBottom: 20,
    textTransform: "capitalize",

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
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
    color: "red",
    marginBottom: 10,
    flexWrap: "no-wrap",

  },
  success: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    marginBottom: 20,
    textTransform: "capitalize",
    marginBottom: 20,
    textDecorationLine: "underline",

  },
  toggleBtn: {
    marginLeft: 10,
    border: "none",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    color: "blue",
    backgroundColor: "palegreen",
  },
  toggleLabel: {
    fontStyle: "italic",
    fontSize: 14,
    color: "black",
    fontWeight: "600"

  },
  toggleContainer: {
    justifyContent: "space-around",
    marginBottom: 10,
    marginLeft: 30,
    alignItems: "center"
  },
  loginError: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    marginBottom: 20,


  },
  DialogContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forgotpass: {
    backgroundColor: "palegreen",
    border: "none",
    paddingLeft: 40,
    fontSize: 12,
    fontWeight: "600"
  }

}))
const Login = ({ setActive, onFormSwitch, setUser }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState("")
  const [loginComment, setLoginComment] = useState("")
  const [loginError, setLoginError] = useState('');
  // calling loginInUser from useUserContext
  const { loginInUser, wardens, handleForgotPassword } = useContext(PrisonContext)
  // function to validate email
  function validateEmail(e) {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  }

  const handlesubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("you enterred an email of wrong fomart e.g simondev12@gmail.com")
      setTimeout(() => {
        setEmailError("");
        setEmail("")
      }, 2000)

    } else if (password.length < 6) {
      setPasswordError("Your enterred a weak password, your password should have atleast six characters")
      setTimeout(() => {
        setPasswordError('')
        setpassword('')
      }, 2000)
    } else {
      wardens.map((warden) => {
        if (email === warden.email && password === warden.password) {
          setLoginComment("welcome " + warden.fullName)
          setTimeout(() => {
            loginInUser(email, password)
            setActive(1);
            setUser(0)
          }, 2000)

        } else {
          setLoginError("invalid warden, try signing up or check your login credentials")
          setTimeout(() => {
            setEmail("")
            setpassword("")
            setLoginError('')
          }, 3000)
        }

      })

    }


    loginInUser(email, password)

  }


  const [open, setOpen] = useState(false);
  const [emailOne, setEmailOne] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>warden login only</Typography>
      {loginComment ? <Typography className={classes.success}>{loginComment}</Typography> :
        <> {loginError ? <Typography className={classes.loginError}>{loginError}</Typography> : null}</>
      }
      {emailError ? <Typography className={classes.error}>{emailError}</Typography> : null}
      <TextField
        variant='outlined'
        placeholder='enter your email'
        required
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={classes.input}
        label="enter your email"
      /><br /><br />
      {passwordError ? <Typography className={classes.passwordError}>{passwordError}</Typography> : null}
      <TextField
        variant='outlined'
        placeholder='Enter your password'
        required
        type='password'
        value={password}
        onChange={(event) => setpassword(event.target.value)}
        className={classes.input}
        label="Enter your password"
      /><br /><br />
      <button onClick={() => {
        setOpen(true)
      }} className={classes.forgotpass}>Forgot password</button>
      <button onClick={() => { handlesubmit() }} className={classes.loginBtn}>sign in</button>
      <div className={classes.toggleContainer}>
        <span className={classes.toggleLabel}>Don't have an account? </span><span>
          <button className={classes.toggleBtn} onClick={() => onFormSwitch('register')}>Register here</button>
        </span>

      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent className={classes.DialogContainer}>
          <DialogContentText>
            Enter your email address below and we'll send you a password reset
            link.
            <TextField
              margin="dense"
              id="email"
              placeholder="Email Address"
              type="email"
              value={emailOne}
              onChange={(e) => setEmailOne(e.target.value)}


            />
            <Button onClick={() => {
              handleForgotPassword(emailOne)
              setTimeout(() => {
                setOpen(false)
              }, 1000);
            }

            }>
              Submit
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Login