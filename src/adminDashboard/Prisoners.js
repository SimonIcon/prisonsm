import { Box, Drawer, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context'
import PrisonerRecords from './PrisonerRecords'

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        height: "50vh",
        display: "flex",
        flexDirection: "row",
        width: "75vw",
        flex: 1,



    },
    image: {
        height: "80%",
        width: "30vw",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "20%",

    },
    detailContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginLeft: 40,
        paddingTop: 5,
        marginRight: 40
    },
    detail: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 7,
    },
    detailLabel: {
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    detailValue: {
        fontSize: 13,
        fontWeigth: "600",
        paddingLeft: 25,
    },

    prisonerTitle: {
        color: "green",
        fontSize: 20,
        textTransform: "capitalize",
        letterSpacing: 1,
        fontWeight: "bold",
        textDecorationLine: "underline",

    },
    leftContainer: {
        display: "flex",
        flexDirection: "column"
    },
    removeBtn: {
        marginTop: 20,
        textAlign: "center",
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: "rebeccapurple",
        borderRadius: 15,
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "capitalize",
        border: "none"
    },
    recordsBtn: {
        marginTop: 13,
        textAlign: "center",
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: "palegreen",
        borderRadius: 15,
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "capitalize",
        border: "none",
    },
    drawerContainer: {
        width: 400,
        boxSizing: 'border-box',
        backgroundColor: '#101F33',
        color: "whitesmoke",
        paddingTop: "20px",
        height: "100%",
        position: "relative",

    }








}))


const Prisoners = () => {
    const classes = useStyles()
    const { prisoner, setActivePrisoner } = useContext(PrisonContext)
    const [openRecords, setOpenRecords] = useState(false);

    return (
        <div>
            {
                prisoner.map((prisoner) => (
                    <Box key={prisoner.id} className={classes.cardContainer}>
                        <div className={classes.leftContainer}>
                            <img src={prisoner.prisonerImage} className={classes.image} />
                            <button className={classes.removeBtn}>remove {prisoner.fullName}</button>
                        </div>
                        <div className={classes.detailContainer}>
                            <div className={classes.detail}>
                                <Typography className={classes.prisonerTitle}>prisoner details</Typography>
                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>name</Typography>
                                <Typography className={classes.detailValue}>{prisoner.fullName}</Typography>

                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>identification number</Typography>
                                <Typography className={classes.detailValue}>{prisoner.identificationNumber}</Typography>

                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>Home town</Typography>
                                <Typography className={classes.detailValue}>{prisoner.address}</Typography>

                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>prisoner number</Typography>
                                <Typography className={classes.detailValue}>{prisoner.PrisonerAdm}</Typography>

                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>crime</Typography>
                                <Typography className={classes.detailValue}>{prisoner.crime}</Typography>

                            </div>

                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>imprisonment Duration</Typography>
                                <Typography className={classes.detailValue}>{prisoner.imprisonmentDuration} years</Typography>

                            </div>
                            <div className={classes.detail}>
                                <Typography className={classes.detailLabel}>dates of admission</Typography>
                                <Typography className={classes.detailValue}>
                                    {
                                        prisoner.admissionDates.toDate().toDateString()

                                    } </Typography>
                            </div>
                            <button className={classes.recordsBtn} onClick={() => {
                                setOpenRecords(true)
                                setActivePrisoner(prisoner)
                            }}> {prisoner.fullName} records</button>


                        </div>

                    </Box>
                ))

            }
            <Drawer variant='temporary' anchor='right' open={openRecords}
                onClose={() => setOpenRecords(false)}
            >
                <Box className={classes.drawerContainer}>
                    <PrisonerRecords />
                </Box>
            </Drawer>

        </div >
    )
}

export default Prisoners