import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles"
import { TextField, Typography } from '@material-ui/core'
import { PrisonContext } from '../api/context'

const useStyles = makeStyles((theme) => ({
    ListContainer: {
        height: "88vh",
        width: "77vw",
        left: "28vw",
        marginTop: -20,
    },
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
        width: "60%",
        justifyContent: "space-between",
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
        paddingTop: 20,
        alignItem: "center",
        paddingRight: 40,

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

    },
    input: {
        fontWeight: "bold"
    }
}))

const PrisonerList = ({ name, openModal, description }) => {
    const classes = useStyles()
    const { prisoner, setSelectedPrisoner } = useContext(PrisonContext)
    const [searchedName, setSearchedName] = useState('')

    const [searchedPrisoner, setsearchedPrisoner] = useState([])
    const handleSearchPrisoner = () => {
        const results = prisoner.filter((query) => query.fullName.includes(searchedName))
            .slice(0, 10) // get only the first 10 elements
            .sort((a, b) => a.fullName.localeCompare(b.key))
        setsearchedPrisoner(results)

    }
    useEffect(() => {
        handleSearchPrisoner()
    }, [searchedName])
    return (
        <div className={classes.ListContainer}>
            <div className={classes.headerContainer}>
                <h3 className={classes.description}>{description}</h3>
                <TextField variant='outlined' required type='text' value={searchedName}
                    onChange={(event) => {
                        setSearchedName(event.target.value)
                        handleSearchPrisoner()
                    }}
                    className={classes.input}
                    placeholder="search prisoner by name"
                />
            </div>
            <div className={classes.list}>
                {
                    searchedPrisoner.length > 0 ? <>
                        {
                            searchedPrisoner.map((p) => (
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

                    </> : <>
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
                    </>
                }


            </div>

        </div>
    )
}

export default PrisonerList