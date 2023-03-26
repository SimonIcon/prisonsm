import { MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context'
import PrisonerList from './PrisonerList'

const useStyles = makeStyles((theme) => ({
    input: {
        paddingLeft: 30,
        paddingTop: 5,
        paddingBottom: 5,
        width: "55%",
        fontWeight: "bold",
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        marginTop: 8,

    },
    addButton: {
        width: "55%",
        textAlign: "center",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: "palegreen",
        border: "none",
        borderRadius: 20,
        marginTop: 15,
        textTransform: "capitalize",
        fontSize: 16,
        fontWeight: "bold"

    },

    selectContainer: {
        border: 2,
        width: "55%",
        borderColor: "black",
        marginTop: 20,
        textAlign: "center",

    },
    menuLabel: {
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
        paddingTop: 7,
        paddingBottom: 7,
    },
    subtitle: {
        fontStyle: "italic",
        fontSize: 15,
        textDecorationLine: "underline",
        letterSpacing: 1,
        textAlign: "flex-start"
    },


    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "50vw",
        height: "50vh",
        position: "absolute",
        marginTop: "20vh",
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
    }



}))

const PrisonerVisitorRecord = () => {
    const classes = useStyles()
    const description = "record visitors details"
    const [visitorName, setVisitorName] = useState('')
    const [selectedVisitor, setSelectedVisitor] = useState('relative');
    const { selectedPrisoner, addPrisonerVisitor } = useContext(PrisonContext)
    const [openVisitor, setOpenVisitor] = useState(false)
    const [nameError, setNameError] = useState("");
    const [comment, setComment] = useState('')

    const handleAddVisitor = () => {
        if (visitorName.length === 0) {
            setNameError("you have not enterred visitor name")
            setTimeout(() => {
                setNameError("")
                setVisitorName('')
            }, 2000);
        } else {
            addPrisonerVisitor(visitorName, selectedVisitor)
            setComment("visitor data was added successfully")
            setTimeout(() => {
                setComment('')
                setOpenVisitor(false)
            }, 2000);
        }
    }
    return (
        <div className={classes.container}>
            <PrisonerList name="records details" openModal={setOpenVisitor} description={description} />
            <Modal
                open={openVisitor}
                onClose={() => setOpenVisitor(false)}
            >
                <div className={classes.modal}>
                    <Typography className={classes.title}>{selectedPrisoner.fullName} visitor</Typography>
                    {comment ? <Typography className={classes.success}>{comment}</Typography> : null}
                    <TextField variant='outlined' required type='text' value={visitorName}
                        onChange={(event) => setVisitorName(event.target.value)}
                        className={classes.input}
                        label="Visitor name"
                        InputLabelProps={{ shrink: true, textAlign: "center", fontWeight: "bold", paddingLeft: 30 }}
                    /><br />
                    {nameError ? <Typography className={classes.error}>{nameError}</Typography> : null}<br />
                    <Typography className={classes.subtitle}>visited by</Typography>
                    <Select value={selectedVisitor} onChange={(e) => setSelectedVisitor(e.target.value)}
                        className={classes.selectContainer}
                    >
                        <MenuItem value="relative" className={classes.menuLabel}>relative</MenuItem>
                        <MenuItem value="spouse" className={classes.menuLabel}>spouse</MenuItem>
                        <MenuItem value="friend" className={classes.menuLabel}>friend</MenuItem>
                        <MenuItem value='lawyer' className={classes.menuLabel}>lawyer</MenuItem>
                    </Select>
                    <button className={classes.addButton} onClick={() => handleAddVisitor()}>add visitor</button>


                </div>

            </Modal>

        </div>
    )
}

export default PrisonerVisitorRecord