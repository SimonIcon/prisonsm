import React, { useContext, useState } from 'react'
import { makeStyles } from "@mui/styles"
import { TextField, Typography } from '@material-ui/core'
import { PrisonContext } from '../api/context'

const useStyles = makeStyles((theme) => ({
    image: {
        height: 120,
        width: 120,
        borderRadius: "50%",
        objectFit: "cover",
        objectPosition: "center",
    },
    info: {
        paddingLeft: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    name: {
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
        paddingTop: 10,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: 25,
    },
    button: {
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
        marginTop: 15,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: "bold",
        border: "none",
        backgroundColor: "palegreen",
        borderRadius: 15,

    },
    activeDetails: {
        marginLeft: 25,
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        width: "60vw",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
        position: "fixed",
        marginBottom: 30,
        marginTop: -50,

    },
    description: {
        fontWeight: "bold",
        fontSize: 22,
        textTransform: "capitalize",
        letterSpacing: 1,
        color: "green",
        marginRight: 30,
        textDecorationLine: "underline"
    },
    list: {
        marginTop: 60,
        position: "relative",
    }
}))

const PrisonerList = ({ name, openModal, description }) => {
    const classes = useStyles()
    const { prisoner, setSelectedPrisoner, selectedPrisoner } = useContext(PrisonContext)
    const [searchedPrisoner, setSearchedPrisoner] = useState('')
    console.log(selectedPrisoner)
    return (
        <div>
            <div className={classes.headerContainer}>
                <h3 className={classes.description}>{description}</h3>
                <TextField variant='outlined' required type='text' value={searchedPrisoner}
                    onChange={(event) => setSearchedPrisoner(event.target.value)}
                    className={classes.input}
                    placeholder="search prisoner by name"
                />
            </div>
            <div className={classes.list}>
                {
                    prisoner.map((p) => (
                        <div key={p.id} className={classes.container}>
                            <div className={classes.info}>
                                <img src={p.prisonerImage} className={classes.image} />
                                <div className={classes.activeDetails}>
                                    <Typography className={classes.name}>{p.fullName}</Typography>
                                    <Typography className={classes.name}>{p.PrisonerAdm}</Typography>
                                    <button className={classes.button} onClick={() => {
                                        openModal(true)
                                        setSelectedPrisoner(p)
                                    }}>{name}</button>
                                </div>

                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default PrisonerList