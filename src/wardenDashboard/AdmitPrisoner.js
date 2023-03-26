import { TextField ,Typography} from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useState,useEffect,useContext } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {  storage } from '../api/firebase';
import { PrisonContext } from '../api/context'

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
        marginTop: 20,
        width:"30vw",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingRight:20,
    },
    registerPrisoner:{
        width:"30vw",
        paddingBottom:10,
        paddingTop:10,
        textAlign:"Center",
        backgroundColor:"palegreen",
        textTransform:"capitalize",
        fontWeight:"bold",
        fontSize:15,
        paddingLeft:20,
        marginLeft:40,
        marginTop:20,
        borderRadius:20

    },
    subContainer:{
        width:"35vw",
        display:"flex",
        justifyContent:"flex-start",
        marginTop:15,
        alignItems:"flex-start",
        flexDirection:"column",
        
    
    },
    error:{
        fontSize:9,
        fontWeight:"bold",
        color:"red",
    }


}))

const AdmitPrisoner = () => {
    const classes = useStyles();
    const {registerPrisoner} = useContext(PrisonContext)
    const [prisonerName, setPrisonerName] = useState('');
    const [idNumber, setIdNumber] = useState("")
    const [image, setImage] = useState([]);
    const [age, setAge] = useState(30)
    const [homeTown, setHomeTown] = useState('');
    const [prisonerNumber, setPrisonerNumber] = useState('')
    const[crime,setCrime] = useState('')
    
// handling image upload
const[progress,setProgress] = useState('')
const[url,setUrl] = useState('')
const[uploadError,setUploadError] = useState('')
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    useEffect(() => {
        const uploadProfilePicture = () => {
            const name = new Date().getTime() + image.name;
            const storageRef = ref(storage, `prisonerImages/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on("state_changed", (snapshot) => {
                const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(uploadProgress)
            }, (err) => setUploadError(err), () => {
                getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
                    setUrl(profileUrl)
                    
                })
            })


        }
        image && uploadProfilePicture();

    }, [image])

    // handling errors
    const[nameError,setNameError] = useState('');
    const[idError,setIdError] = useState('')
    const[ageError,setAgeError] = useState('')
    const[addressError,setAddressError] = useState('')
    const[prisonerNumberError,setPrisonerNumberError] = useState('')
    const[imageError,setImageError] = useState('')
    const[crimeError,setCrimeError] = useState('')
    const handleRegisterPrison = () =>{
        if(prisonerName.length === 0){
            setNameError("prison name is required")
            setTimeout(() => {
                setNameError('')
                setPrisonerName('')
            }, 1000);
        }else if(idNumber.length < 8){
            setIdError("Invalid identification number")
            setTimeout(() => {
                setIdError('')
                setIdNumber('')
                
            }, 1000);

        }else if(age === null){
            setAgeError("you have not enterred prisoner age");
            setTimeout(() => {
                setAgeError('')
                
            },1000);

        }else if(homeTown.length===""){
            setAddressError("enter prisoner home town")
            setTimeout(() => {
                setAddressError('')
            },1000);
        }else if(prisonerNumber.length === 0){
            setPrisonerNumberError("you have not enterres prisoner number")
            setTimeout(() => {
                setPrisonerNumberError('')
            }, 1000);
        }else if(image.length === 0){
            setImageError("you have not selected prisoner image")
            setTimeout(() => {
                setImageError('')
            }, 1000);
        }else if(crime.length){
            setCrimeError("you have not enterred prisoner crime")
            setTimeout(() => {
                setCrimeError('')
            }, 1000);
        }else{
           registerPrisoner(prisonerName,idNumber,age,homeTown,prisonerNumber,crime,url)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.subContainer}>
                <TextField variant='outlined' required type='text' value={prisonerName}
                    onChange={(event) => setPrisonerName(event.target.value)}
                    className={classes.input}
                    label="prisoner full name"
                    InputLabelProps={{shrink: true,textAlign:"center",fontWeight:"bold",paddingLeft:30}}
                />
                {nameError ? <Typography className={classes.error}>{nameError}</Typography>:null}
                <TextField variant='outlined' required type='text' value={idNumber}
                    onChange={(event) => setIdNumber(event.target.value)}
                    className={classes.input}
                    label="prisoner id number"
                    InputLabelProps={{shrink: true,}}
                />
                {idError ? <Typography className={classes.error}>{idError}</Typography>:null}
                
                <TextField variant='outlined' required type='number' value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className={classes.input}
                    label="prisoner age"
                    InputLabelProps={{shrink: true,}}
                />
                {ageError ? <Typography className={classes.error}>{ageError}</Typography>:null}
                <TextField variant='outlined' required type='text' value={homeTown}
                    onChange={(event) => setHomeTown(event.target.value)}
                    className={classes.input}
                    label="prisoner home town"
                    InputLabelProps={{shrink: true,}}
                />
                {addressError ? <Typography className={classes.error}>{addressError}</Typography>:null}
                <TextField variant='outlined' required type='text' value={prisonerNumber}
                    onChange={(event) => setPrisonerNumber(event.target.value)}
                    className={classes.input}
                    label="prisoner number"
                    InputLabelProps={{shrink: true,}}
                />
                {prisonerNumberError ? <Typography className={classes.error}>{prisonerNumberError}</Typography>:null}

            </div>
            <div className={classes.subContainer}>
                {progress > 0 && progress < 100 ? <Typography>uploading {progress}%</Typography>:<>
                {progress === 100 ?<Typography>completed</Typography>:null}
                </>}
              <TextField type="file" label="Choose prisoner image" onChange={handleImageChange}
                    InputLabelProps={{shrink: true,}}
                    inputProps={{accept: 'image/*',}}
                    variant='outlined'
                    className={classes.input}
                    
                />
                {/* {uploadError ? <Typography className={classes.error}>{uploadError}</Typography>:<>
                {imageError ? <Typography className={classes.error}>{imageError}</Typography>:null}
                </>} */}
                
                <TextField variant='outlined' required type='text' value={crime}
                    onChange={(event) => setCrime(event.target.value)}
                    className={classes.input}
                    label="prisoner crime"
                    InputLabelProps={{shrink: true,textAlign:"center"}}
                />
                {crimeError ? <Typography className={classes.error}>{crimeError}</Typography>:null}
                <button className={classes.registerPrisoner} onClick={handleRegisterPrison()}>
                    register prisoner
                </button>
                  


            </div>

        </div>
    )
}

export default AdmitPrisoner