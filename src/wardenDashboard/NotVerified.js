import { Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "green",

    },
    name: {
        textTransform: "capitalize",
        textDecorationLine: "underline",

    },
    message: {
        color: "green",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"

    }

}))

const NotVerified = ({ user }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h4 className={classes.title}> hello <span className={classes.name}>{user.fullName}</span></h4>
            <Typography className={classes.message}>Thank you for creating working account, wait a moment before we verify your account</Typography>
        </div>
    )
}

export default NotVerified