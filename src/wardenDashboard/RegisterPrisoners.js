import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { PrisonContext } from '../api/context';
import { storage } from '../api/firebase';


const useStyles = makeStyles((theme) => ({
  input: {
    paddingLeft: 30,
    paddingTop: 5,
    paddingBottom: 5,
    width: "80%",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 8,
    width: "30vw",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 20,
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: "column",


    },
  },
  registerPrisoner: {
    width: "30vw",
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: "Center",
    backgroundColor: "palegreen",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 20,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 20

  },
  subContainer: {
    width: "35vw",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 15,
    alignItems: "flex-start",
    flexDirection: "column",


  },
  error: {
    fontSize: 9,
    fontWeight: "bold",
    color: "red",
    paddingLeft: 35,
  },
  uploadStatus: {
    color: "green",
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  }


}))


const RegisterPrisoners = () => {
  const classes = useStyles()

  const { registerPrisoner, prisoner } = useContext(PrisonContext)
  const prisoners = [];
  prisoners.push(prisoner)
  const [prisonerName, setPrisonerName] = useState('');
  const [idNumber, setIdNumber] = useState("")
  const [file, setFile] = useState([]);
  const [age, setAge] = useState(30)
  const [homeTown, setHomeTown] = useState('');
  const [prisonerNumber, setPrisonerNumber] = useState('')
  const [crime, setCrime] = useState('');
  const [imprisonment, setImprisonment] = useState(0)


  //  handling image uploading to 
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState('')
  const [uploadError, setUploadError] = useState("");
  useEffect(() => {
    const uploadProfilePicture = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `prisonerImages/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(uploadProgress)
      }, (err) => setUploadError("eror while uploading image to database"), () => {
        getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
          setUrl(profileUrl)
          console.log(profileUrl);
        })
      })


    }
    file && uploadProfilePicture();

  }, [file])


  /// handling errors
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [crimeError, setCrimeError] = useState('')
  const [imprisonmentError, setImprisonmentError] = useState('')
  const [admError, setAdmError] = useState('')
  const [fileError, setFileError] = useState('')
  const [comment, setComment] = useState('')

  const handleRegister = () => {
    if (prisonerName < 1) {
      setNameError("you have not enterred prisoner name")
      setTimeout(() => {
        setNameError('')
        setPrisonerName('')
      }, 1000)
    } else if (idNumber.length < 8) {
      setIdError("you have enterred invalid iddentifiaction number")
      setTimeout(() => {
        setIdError('')
        setIdNumber('')
      }, 2000);
    } else if (age < 18) {
      setAgeError("prisoner is too young to be held here")
      setTimeout(() => {
        setAgeError('')
        setAge('')

      }, 2000);
    } else if (homeTown.length < 1) {
      setAddressError("You have not enteerred prisoner home town")
      setTimeout(() => {
        setAddressError('')
        setHomeTown('')
      }, 2000);

    } else if (prisonerNumber === "") {
      setAdmError("you have not enterred prisoner admission number")
      setTimeout(() => {
        setPrisonerNumber('')
        setAdmError("")

      }, 2000);
    } else if (file.length === 0) {
      setFileError("you have not selected prisoner image")
      setTimeout(() => {
        setFileError('')
        setFile([])
      }, 2000);
    } else if (crime.length === 0) {
      setCrimeError("You have not enterred prisoner crime");
      setTimeout(() => {
        setCrimeError('')
        setCrime("")
      }, 2000);
    } else if (imprisonment === 0) {
      setImprisonmentError("invalid duration")
      setTimeout(() => {
        setImprisonmentError('')
        setImprisonment('')
      }, 2000);
    } else if (prisonerNumber === prisoners.map((prisoner) => prisoner.PrisonerAdm)) {
      setAdmError("this registration number already exists")
      setTimeout(() => {
        setAdmError("")
        setPrisonerNumber("")
      }, 2000);

    }
    else {

      (registerPrisoner(prisonerName, idNumber, age, homeTown, prisonerNumber, crime, url, imprisonment))
      setComment("you have successfully added prisoner");
      setTimeout(() => {
        setComment("")
        setAge("")
        setIdNumber("")
        setPrisonerName('')
        setPrisonerNumber('')
        setHomeTown("")
        setCrime("")
        setImprisonment("")
        setFile([])

      }, 2000);

      // else {
      //   setComment("prisoner was not added, check prisoner admission number already exists")
      //   setTimeout(() => {
      //     setComment("")
      //     setPrisonerNumber("")

      //   }, 2000);
      // }


    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <TextField variant='outlined' required type='text' value={prisonerName}
          onChange={(event) => setPrisonerName(event.target.value)}
          className={classes.input}
          label="prisoner full name"
          InputLabelProps={{ shrink: true, textAlign: "center", fontWeight: "bold", paddingLeft: 30 }}
        /><br />
        {nameError ? <Typography className={classes.error}>{nameError}</Typography> : null}
        <TextField variant='outlined' required type='text' value={idNumber}
          onChange={(event) => setIdNumber(event.target.value)}
          className={classes.input}
          label="prisoner id number"
          InputLabelProps={{ shrink: true, }}
        /><br />
        {idError ? <Typography className={classes.error}>{idError}</Typography> : null}
        <br />
        <TextField variant='outlined' required type='number' value={age}
          onChange={(event) => setAge(event.target.value)}
          className={classes.input}
          label="prisoner age"
          InputLabelProps={{ shrink: true, }}
        /><br />
        {ageError ? <Typography className={classes.error}>{ageError}</Typography> : null}
        <TextField variant='outlined' required type='text' value={homeTown}
          onChange={(event) => setHomeTown(event.target.value)}
          className={classes.input}
          label="prisoner home town"
          InputLabelProps={{ shrink: true, }}
        /><br />
        {addressError ? <Typography className={classes.error}>{addressError}</Typography> : null}
        <br />
        <TextField variant='outlined' required type='text' value={prisonerNumber}
          onChange={(event) => setPrisonerNumber(event.target.value)}
          className={classes.input}
          label="prisoner number"
          InputLabelProps={{ shrink: true, }}
        /><br />
        {admError ? <Typography className={classes.error}>{admError}</Typography> : null}
        <br />
      </div>
      <div className={classes.subContainer}>
        {progress > 0 && progress < 100 ? <Typography>uploading : {progress}%</Typography> : <>
          {progress === 100 ? <Typography className={classes.uploadStatus}>completed
            {setTimeout(() => { setProgress('') }, 2000)}</Typography>
            : <>
              {uploadError ? <Typography className={classes.error}>{uploadError}</Typography> : null}
            </>}</>}
        <br />
        <TextField type="file" label={"upload prisoner image"} variant="outlined"
          onChange={(event) => setFile(event.target.files[0])}
          InputLabelProps={{ shrink: true, }}
          inputProps={{ accept: 'image/*', }}
          className={classes.input}

        /><br />

        {fileError ? <Typography className={classes.error}>{fileError}</Typography> : null}
        <br />
        <TextField variant='outlined' required type='text' value={crime}
          onChange={(event) => setCrime(event.target.value)}
          className={classes.input}
          label="prisoner crime"
          InputLabelProps={{ shrink: true, textAlign: "center" }}
        /><br />
        {crimeError ? <Typography className={classes.error}>{crimeError}</Typography> : null}
        <TextField variant='outlined' required type='number' value={imprisonment}
          onChange={(event) => setImprisonment(event.target.value)}
          className={classes.input}
          label="imprisonment duration"
          InputLabelProps={{ shrink: true, textAlign: "center" }}
        /><br />
        {imprisonmentError ? <Typography className={classes.error}>{imprisonmentError}</Typography> : null}
        <br />
        <button className={classes.registerPrisoner} onClick={() => { handleRegister() }}>
          register prisoner
        </button>
        <br />
        {comment ? <Typography>{comment}</Typography> : null}



      </div>


    </div>
  )
}

export default RegisterPrisoners