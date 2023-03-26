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
            height: "70vh",
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
            height: "70vh",
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
            height: "70vh",
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
    dutiesContainer: {
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
    },
    datesContainer: {
        marginLeft: 30,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    dateLabel: {
        marginRight: 25,
        fontWeight: "bold",
        fontSize: 15,
    },
    dateInput: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 2,
    }

}))


const PrisonerTaskSchedular = () => {
    const [task, openTask] = useState(false)
    const description = "allocate prisoner to different duties";
    const [duties, setDuties] = useState("")
    const [supervisor, setSupervisor] = useState("")
    const [location, setLocation] = useState("within");
    const [selectedDate, setSelectedDate] = useState("")
    const classes = useStyles()
    const { addDutiesRecord } = useContext(PrisonContext)

    // handle add
    const [dateError, setDateError] = useState("")
    const [dutyError, setDutyError] = useState("")
    const [surpervisorError, setSurpervisorError] = useState("")
    const [comment, setComment] = useState("")


    const handleAdd = () => {
        if (duties === "") {
            setDutyError("you have not enterred prisoner duty")
            setTimeout(() => {
                setDutyError("")
            }, 2000);

        } else if (supervisor === "") {
            setSurpervisorError("you have not selected supervisor")
            setTimeout(() => {
                setSurpervisorError("")
            }, 2000);
        } else if (selectedDate === "") {
            setDateError("you have not selected duties dates")
            setTimeout(() => {
                setDateError("")
            }, 2000);
        } else {
            addDutiesRecord(duties, supervisor, location, selectedDate)
            setComment("updated data")
            setTimeout(() => {
                setComment("")
                setLocation("")
                setSupervisor("")
                setSelectedDate("")
                setDuties("")
                openTask(false)
            }, 2000);
        }
    }
    return (
        <div>
            <PrisonerList name="update records" openModal={openTask} description={description} />
            <Modal open={task} onClose={() => openTask(false)} className={classes.modal}>
                <Box className={classes.dutiesContainer}>
                    {comment ? <Typography className={classes.success}>{comment}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={duties}
                        onChange={(event) => setDuties(event.target.value)}
                        className={classes.input}
                        label="Enter prisoner duty"
                        InputLabelProps={{ shrink: true, }} />
                    {dutyError ? <Typography className={classes.error}>{dutyError}</Typography> : null}
                    <Typography className={classes.title}>select duty supervisor</Typography>
                    <Select value={supervisor} onChange={(e) => setSupervisor(e.target.value)}
                        className={classes.selectContainer}>
                        <MenuItem value="police one" className={classes.menuLabel}>police one</MenuItem>
                        <MenuItem value="police two" className={classes.menuLabel}>police two</MenuItem>
                        <MenuItem value="police three" className={classes.menuLabel}>police three</MenuItem>
                        <MenuItem value='police four' className={classes.menuLabel}>police four</MenuItem>
                    </Select>
                    {surpervisorError ? <Typography className={classes.error}>{surpervisorError}</Typography> : null}
                    <div className={classes.datesContainer}>
                        <Typography className={classes.dateLabel}>Select day of appeal</Typography>
                        <input type="date" name="date" value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} className={classes.dateInput} />

                    </div>
                    {dateError ? <Typography className={classes.error}>{dateError}</Typography> : null}
                    <Typography className={classes.title}>location of the duty</Typography>
                    <Select value={location} onChange={(e) => setLocation(e.target.value)}
                        className={classes.selectContainer}>
                        <MenuItem value="within" className={classes.menuLabel}>within</MenuItem>
                        <MenuItem value="outside" className={classes.menuLabel}>outside</MenuItem>
                    </Select>
                    <button className={classes.addButton} onClick={() => handleAdd()}>add duty</button>
                </Box>
            </Modal>
        </div>
    )
}

export default PrisonerTaskSchedular