import { Box, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context'
import PrisonerList from './PrisonerList'

const useStyles = makeStyles((theme) => ({
    modal: {

        [theme.breakpoints.down('sm')]: {
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "white",
            width: "80vw",
            height: "65vh",
            position: "absolute",
            marginTop: "10vh",
            marginLeft: "10vw",
            flexDirection: "column",
        },
        [theme.breakpoints.between('sm', 'md')]: {
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "white",
            width: "60vw",
            height: "65vh",
            position: "absolute",
            marginTop: "10vh",
            marginLeft: "10vw",
            flexDirection: "column",
        },
        [theme.breakpoints.up('md')]: {
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "white",
            width: "60vw",
            height: "65vh",
            position: "absolute",
            marginTop: "10vh",
            marginLeft: "10vw",
            flexDirection: "column",
        },


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
    healthContainer: {
        width: "100%",
        height: "100%",
        paddingLeft: 40,
        paddingTop: 20,
        backgroundColor: "white",

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
        marginTop: 20,
    },
    addButton: {
        paddingTop: 7,
        paddingBottom: 7,
        width: "68%",
        marginLeft: 30,
        marginTop: 15,
        backgroundColor: "palegreen",
        fontSize: 16,
        textTransform: "capitalize",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 20
    },

}))

const PrisonerHealthRecord = () => {
    const [healthCare, openHealthCare] = useState(false)
    const description = "update health records";
    const [illness, setIllness] = useState("");
    const [medication, setMedication] = useState("")
    const [attendee, setAttendee] = useState("")
    const classes = useStyles()
    const { addHealthRecord } = useContext(PrisonContext)

    // handle add
    const [illnessError, setIllnessError] = useState("")
    const [medErr, setMedError] = useState("")
    const [selectedAttendee, setSelectedAttendee] = useState("")
    const [comment, setComment] = useState("")
    const handleAdd = () => {
        if (illness === "") {
            setIllnessError("you have not enterred where prisoner is suffering from")
            setTimeout(() => {
                setIllnessError("")
            }, 2000);

        } else if (medication === "") {
            setMedError("you have not enterred prisoner prescription")
            setTimeout(() => {
                setMedError("")
            }, 2000);

        } else if (attendee === "") {
            setSelectedAttendee("you have not selected attendee")
            setTimeout(() => {
                setSelectedAttendee("")
            }, 2000);

        } else {
            addHealthRecord(illness, medication, attendee)
            setComment("updated record")
            setTimeout(() => {
                setComment("")
                setIllness("")
                setMedication("")
                setAttendee("")
                openHealthCare(false)

            }, 2000);
        }
    }
    return (
        <div>
            <PrisonerList name="update health record" openModal={openHealthCare} description={description} />
            <Modal open={healthCare} onClose={() => openHealthCare(false)} className={classes.modal}>
                <Box className={classes.healthContainer}>
                    {comment ? <Typography className={classes.success}>{comment}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={illness}
                        onChange={(event) => setIllness(event.target.value)}
                        className={classes.input}
                        label="where is prisoner suffering from?"
                        InputLabelProps={{ shrink: true, }} />
                    {illnessError ? <Typography className={classes.error}>{illnessError}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={medication}
                        onChange={(event) => setMedication(event.target.value)}
                        className={classes.input}
                        label="prescription"
                        InputLabelProps={{ shrink: true, }} />
                    {medErr ? <Typography classes={classes.error}>{medErr}</Typography> : null}
                    <Typography className={classes.title}>prisoner attendee</Typography>
                    <Select value={attendee} onChange={(e) => setAttendee(e.target.value)}
                        className={classes.selectContainer}>
                        <MenuItem value="nurse one" className={classes.menuLabel}>nurse one</MenuItem>
                        <MenuItem value="nurse two" className={classes.menuLabel}>nurse two</MenuItem>
                        <MenuItem value="nurse three" className={classes.menuLabel}>nurse three</MenuItem>
                        <MenuItem value='outside prisons' className={classes.menuLabel}>outside prisons</MenuItem>
                    </Select>
                    {selectedAttendee ? <Typography className={classes.error}>{selectedAttendee}</Typography> : null}
                    <button className={classes.addButton} onClick={() => handleAdd()}>add record</button>
                </Box>
            </Modal>
        </div>
    )
}

export default PrisonerHealthRecord