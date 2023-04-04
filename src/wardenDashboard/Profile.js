import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { PrisonContext } from '../api/context';

const useStyles = makeStyles((theme) => ({
    image: {
        width: "85%",
        height: "30vh",
        borderRadius: 30,
        textAlign: "center",

    },
    container: {
        width: "100%",
    },
    details: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10
    },
    detailLabel: {
        paddingLeft: 5,
        paddingRight: 15,
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    detailValue: {
        paddingRight: 20,
        fontSize: 12,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    emailValue: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "lowercase",

    },
    logoutButton: {
        width: "70%",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        textTransform: "capitalize",
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10
    }

}))

const Profile = ({ user, setActive }) => {
    const classes = useStyles()
    const { logOutUser } = useContext(PrisonContext)
    const handleLogOut = () => {
        logOutUser()
        setTimeout(() => {
            setActive(0)
        }, 1500);

    }

    return (
        <Box className={classes.container}>
            <img src={user.profilePicture} alt="m" className={classes.image} />
            <div className={classes.details}>
                <Typography className={classes.detailLabel}>name</Typography>
                <Typography className={classes.detailValue}>{user.fullName}</Typography>
            </div>
            <div className={classes.details}>
                <Typography className={classes.detailLabel}>email</Typography>
                <Typography className={classes.emailValue}>{user.email}</Typography>
            </div>
            <div className={classes.details}>
                <Typography className={classes.detailLabel}>work id</Typography>
                <Typography className={classes.detailValue}>{user.workId}</Typography>
            </div>
            <button onClick={() => handleLogOut()} className={classes.logoutButton}>log out</button>
        </Box>
    )
}

export default Profile