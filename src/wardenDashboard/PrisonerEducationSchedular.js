import { Box, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context'
import PrisonerList from './PrisonerList'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "white",
        width: "50vw",
        height: "75vh",
        position: "absolute",
        marginTop: "10vh",
        marginLeft: "30vw",
        flexDirection: "column"

    },
    title: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
        textDecorationLine: "underline"
    },
    success: {
        color: "green",
        textAlign: "center",
        fontSize: 15,
        marginTop: 7,
        marginBottom: 10
    },
    error: {
        color: "red",
        textAlign: "center",
        fontSize: 10,
        marginTop: 7,
        marginBottom: 10
    },
    educationContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 20,
        paddingLeft: 30

    },
    addButton: {
        paddingTop: 7,
        paddingBottom: 7,
        width: "68%",
        marginLeft: 30,
        marginTop: 10,
        backgroundColor: "palegreen",
        fontSize: 16,
        textTransform: "capitalize",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 20
    },
    selectContainer: {
        paddingTop: 7,
        paddingBottom: 7,
        width: "68%",
        marginLeft: 30,
        marginTop: 10,


    },
    menuLabel: {
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
        paddingTop: 7,
        paddingBottom: 7,
    },

    input: {
        paddingTop: 7,
        paddingBottom: 7,
        width: "68%",
        marginLeft: 30,
        marginTop: 10,
    }
}))

const PrisonerEducationSchedular = () => {
    const description = "update education dutes"
    const [education, openEducation] = useState(false)
    const [program, setProgram] = useState('')
    const [instructor, setInstructor] = useState('')
    const [duration, setDuration] = useState(0)
    const [level, setLevel] = useState("");
    const classes = useStyles()
    const { addEducationRecord } = useContext(PrisonContext)

    // handle add
    const [programError, setProgramError] = useState("")
    const [instructorError, setInstructorError] = useState("")
    const [durationError, setDurationError] = useState('')
    const [levelError, setLevelError] = useState("")
    const [comment, setComment] = useState("")
    const handleAdd = () => {
        if (program === "") {
            setProgramError("you have not enterred program")
            setTimeout(() => {
                setProgramError("")
            }, 2000);

        } else if (instructor === "") {
            setInstructorError("you have not enterred instructor of the program")
            setTimeout(() => {
                setInstructorError("")
            }, 2000);

        } else if (duration === 0) {
            setDurationError("course should take atleast three months")
            setTimeout(() => {
                setDuration("")
                setDurationError("")
            }, 2000);
        } else if (level === "") {
            setLevelError("you have not selected level of study")
            setTimeout(() => {
                setLevelError("")
            }, 2000);
        } else {
            addEducationRecord(program, instructor, duration, level)
            setComment("education record updated")
            setTimeout(() => {
                setComment("")
                setProgram("")
                setLevel("")
                setDuration("")
                openEducation(false)
                setInstructor("")
            }, 3000);
        }
    }
    return (
        <div>
            <PrisonerList name="update records" openModal={openEducation} description={description} />
            <Modal open={education} onClose={() => openEducation(false)} className={classes.modal}>
                <Box className={classes.educationContainer}>
                    {comment ? <Typography className={classes.success}>{comment}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={program}
                        onChange={(event) => setProgram(event.target.value)}
                        className={classes.input}
                        label="Enter prisoner program"
                        InputLabelProps={{ shrink: true, }} />
                    {programError ? <Typography className={classes.error}>{programError}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={instructor}
                        onChange={(event) => setInstructor(event.target.value)}
                        className={classes.input}
                        label="Enter course instructor"
                        InputLabelProps={{ shrink: true, }} />
                    {instructorError ? <Typography className={classes.error}>{instructorError}</Typography> : null}

                    <TextField variant='outlined' required type='number' value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                        className={classes.input}
                        label="Enter course duration in months"
                        InputLabelProps={{ shrink: true, }} />
                    {durationError ? <Typography className={classes.error}>{durationError}</Typography> : null}
                    <Typography className={classes.title}>select level of education</Typography>
                    <Select value={level} onChange={(e) => setLevel(e.target.value)}
                        className={classes.selectContainer}>
                        <MenuItem value="primary" className={classes.menuLabel}>primary</MenuItem>
                        <MenuItem value="secondry" className={classes.menuLabel}>secondry</MenuItem>
                        <MenuItem value="artisan" className={classes.menuLabel}>artisan</MenuItem>
                        <MenuItem value='certificate' className={classes.menuLabel}>certificate</MenuItem>
                    </Select>
                    {levelError ? <Typography className={classes.error}>{levelError}</Typography> : null}
                    <button className={classes.addButton} onClick={() => handleAdd()}>add data</button>

                </Box>
            </Modal>
        </div>
    )
}

export default PrisonerEducationSchedular