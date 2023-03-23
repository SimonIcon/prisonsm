import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { TextField } from '@material-ui/core';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,

    },
    input: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        width: "65%",
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10,


    },
    signUpBtn: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        width: "65%",
        backgroundColor: "black",
        borderRadius: 20,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "white",
        marginTop: 10,
        marginBottom: 10,
    },
    toggleBtn: {
        marginLeft: 10,
        border: "none",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "capitalize",
        color: "blue"
    },
    toggleLabel: {
        fontStyle: "italic",
        fontSize: 14,
        color: "black"

    },
    toggleContainer: {
        justifyContent: "space-around",
        marginBottom: 10,
        marginLeft: 30,
        alignItems: "center"
    }
}))
const SignUp = ({ onFormSwitch, setUser, setActive }) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passOne, setPassOne] = useState('');
    const [workNumber, setWorkNumber] = useState('')
    const [file, setFile] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState('')
    const [url, setUrl] = useState("");
    // creating user
    //   validating user email
    function validateEmail(e) {
        const re = /\S+@\S+\.\S+/;
        return re.test(e);
    }
    // setting up variables
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmErro] = useState("");
    const [nameError, setNameError] = useState("");
    const [workNumberError, setworkNumberError] = useState('')
    const [fileError, setFileError] = useState("")
    const [success, setSuccess] = useState('')
    const createUser = async () => {
        // data verification
        if (!validateEmail(email)) {
            setTimeout(() => {
                setEmailError("invalid email")
            }, 1000)

        } else if (pass.length < 7) {
            setTimeout(() => {
                setPasswordError("weak password, password must contain more than seven characters")
            }, 500)

        } else if (pass !== passOne) {
            setTimeout(() => {
                setConfirmErro("password are mismatching")
            }, 500)

        } else if (name === "") {
            setTimeout(() => {
                setNameError("your have not enterred your names")
            }, 500)
        } else if (workNumber === "") {
            setTimeout(() => {
                setworkNumberError(" enter work id")
            }, 500)
        } else if (url === "") {
            setTimeout(() => {
                setFileError("image not uploaded")
            }, 500)
        } else {
            try {
                const res = createUserWithEmailAndPassword(auth, email, pass)
                setDoc(doc(db, "wardens", (await res).user.uid), {
                    fullName: name,
                    email: email,
                    password: pass,
                    status: "persive",
                    workId: workNumber,
                    profilePicture: url,
                })
            } catch (error) {
                console.log("this error occurred" + error)

            } finally {
                setTimeout(() => {
                    setSuccess("you have accurately created your profile wait for verification, thank you")
                    setActive(true)
                    setUser(0)
                }, 1000)

            }
        }

    }



    //  handling image uploading to firebase
    useEffect(() => {
        const uploadProfilePicture = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, `userProfiles/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(uploadProgress)
            }, (err) => setUploadError(err), () => {
                getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
                    setUrl(profileUrl)
                    console.log(profileUrl);
                })
            })


        }
        file && uploadProfilePicture();

    }, [file])

    return (
        <div className={classes.container}>
            {
                success ? <h6 className={classes.success}>{success}</h6> : null

            }
            <br />
            {nameError ? <h6>{nameError}</h6> : null}
            <TextField type="text" value={name} onChange={(e) => setName(e.target.value)}
                label={"Enter your name"} required className={classes.input} InputLabelProps={{ shrink: true, }}
            /><br /><br />
            {workNumberError ? <h6>{workNumber}</h6> : null}
            <TextField type="text" value={workNumber} onChange={(e) => setWorkNumber(e.target.value)} placeholder="enter your work id"
                label={"Enter your work id"} required className={classes.input} InputLabelProps={{ shrink: true, }}

            /><br /><br />
            {emailError ? <h6>{emailError}</h6> : null}
            <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email"
                label={"Enter your email"} required className={classes.input} InputLabelProps={{ shrink: true, }}

            /><br /> <br />
            {passwordError ? <h6>{passwordError}</h6> : null}
            <TextField type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="enter your password"
                label={"confirm your password"} required className={classes.input} InputLabelProps={{ shrink: true, }}

            /><br /><br />
            {confirmError ? <h6>{fileError}</h6> : null}
            <TextField type="password" value={passOne} onChange={(e) => setPassOne(e.target.value)} placeholder="confirm your password"
                label={"confirm your password"} required className={classes.input} InputLabelProps={{ shrink: true, }}

            /><br /><br />
            {fileError ? <h6>{fileError}</h6> : null}
            <TextField type="file" label={"upload your profile picture"} variant="outlined"
                onChange={(event) => setFile(event.target.files[0])}
                InputLabelProps={{ shrink: true, }}
                inputProps={{ accept: 'image/*', }}
                className={classes.input}

            /><br /><br />
            {progress ? <p className={classes.uploadingStatus}>{progress < 100 ?
                <h4>uploading progress:{progress}%</h4> : <h4>completed</h4>}</p> :
                <p className={classes.uploadingStatus}> {uploadError ?
                    <h4>an error have occurred during uploading profile:{uploadError}</h4> : null}</p>
            }
            <br />
            <button className={classes.signUpBtn} onClick={() => {
                createUser()
                // setActive(1);
                // setUser(0)
            }} >
                sign up
            </button>
            <div className={classes.toggleContainer}>
                <span className={classes.toggleLabel}>Already have an account? </span>
                <button onClick={() => onFormSwitch('login')} className={classes.toggleBtn}> sign in</button>
            </div>


        </div>
    )
}

export default SignUp