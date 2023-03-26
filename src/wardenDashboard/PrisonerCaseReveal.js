import { Box, Modal, TextField, Typography } from '@material-ui/core'
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
    appealContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center"
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
    },
    input: {
        paddingTop: 7,
        paddingBottom: 7,
        width: "68%",
        marginLeft: 30,
        marginTop: 10,

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
    }

}))

const PrisonerCaseReveal = () => {
    const [caseAppeal, openCaseAppeal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const [courtNumber, setCourtNumber] = useState('')
    const [lawyer, setLawyer] = useState('')
    const [lawyerCellphone, setLawyerCellphone] = useState('')
    const { addCaseAppealRecord } = useContext(PrisonContext)
    const description = "update case appeal records"
    const classes = useStyles()

    // handling submit
    const [dateError, setDateError] = useState('')
    const [courtNoError, setCourtNoError] = useState("")
    const [lawyerError, setLawyerError] = useState('')
    const [cellphoneError, setCellphoneError] = useState("");
    const [comment, setComment] = useState("")
    const handleCaseAppeal = () => {
        if (selectedDate === "") {
            setDateError("you have not selected dates")
            setTimeout(() => {
                setDateError("")
            }, 2000);

        } else if (courtNumber === '') {
            setCourtNoError("you have not enterred court number")
            setTimeout(() => {
                setCourtNoError("")
            }, 2000);

        } else if (lawyer === "") {
            setLawyerError("you have not enterred lawyer name")
            setTimeout(() => {
                setLawyerError("")
            }, 2000);
        } else if (lawyerCellphone.length < 10) {
            setCellphoneError("invalid phone number")
            setTimeout(() => {
                setCellphoneError("")
                setLawyerCellphone('')
            }, 2000);

        } else if (lawyerCellphone.length > 10) {
            setCellphoneError("invalid phone number")
            setTimeout(() => {
                setCellphoneError("")
                setLawyerCellphone('')
            }, 2000);
        }

        else if (lawyerCellphone === "") {
            setCellphoneError("you have not enterred lawyer tellphone number")
            setTimeout(() => {
                setCellphoneError('')
            }, 2000);
        } else {
            addCaseAppealRecord(selectedDate, courtNumber, lawyer, lawyerCellphone)
            setComment("case appeal record updated")
            setTimeout(() => {
                setSelectedDate("")
                setCourtNumber("")
                setLawyer("")
                setLawyerCellphone("")
                openCaseAppeal(false)
                setComment("")
            }, 3000);
        }
    }


    return (
        <div>
            <PrisonerList name="update records" openModal={openCaseAppeal} description={description} />
            <Modal open={caseAppeal} onClose={() => openCaseAppeal(false)} className={classes.modal}>
                <Box className={classes.appealContainer}>
                    {comment ? <Typography className={classes.success}>{comment}</Typography> : null}
                    <div className={classes.datesContainer}>
                        <Typography className={classes.dateLabel}>Select day of appeal</Typography>
                        <input type="date" name="date" value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} className={classes.dateInput} />
                        {dateError ? <Typography className={classes.error}>{dateError}</Typography> : null}
                    </div>
                    <TextField variant='outlined' required type='text' value={courtNumber}
                        onChange={(event) => setCourtNumber(event.target.value)}
                        className={classes.input}
                        label="court number"
                        InputLabelProps={{ shrink: true, }} />
                    {courtNoError ? <Typography className={classes.error}>{courtNoError}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={lawyer}
                        onChange={(event) => setLawyer(event.target.value)}
                        className={classes.input}
                        label="lawyer name"
                        InputLabelProps={{ shrink: true, }} />
                    {lawyerError ? <Typography className={classes.error}>{lawyerError}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={lawyerCellphone}
                        onChange={(event) => setLawyerCellphone(event.target.value)}
                        className={classes.input}
                        label="lawyer telephone number"
                        placeholder='eg 0700 000 000'
                        InputLabelProps={{ shrink: true, }} />
                    {cellphoneError ? <Typography className={classes.error}>{cellphoneError}</Typography> : null}
                    <div>
                        <button className={classes.addButton} onClick={() => handleCaseAppeal()}>add record</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default PrisonerCaseReveal