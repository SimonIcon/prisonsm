import { Avatar, IconButton, } from '@material-ui/core';
import { AppBar, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, ListItemIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useContext, useState, useEffect } from 'react'
import taskList from "../api/taskData";
import info from '../api/info';
import { PrisonContext } from '../api/context';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100vw",
        height: "100vh"
    },
    headerContainer: {
        color: "whitesmoke",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
    },
    mytask: {
        textTransform: "uppercase",
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontSize: 17,
        letterSpacing: 1,
        paddingLeft: 40,

    },
    listButton: {
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 15,
    },
    mobile: {
        left: "250px", top: "70px", position: "absolute"
    },
    laptop: { top: "70px", position: "absolute" },
    menuBtn: {
        color: "black",
        textTransform: "capitalize",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 13,
    },
    profileContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingLeft: 10,

    }


}))



const Verified = ({ user, setActive }) => {
    const classes = useStyles()
    const drawerWidth = 230;

    const [selected, setSelected] = useState(info[0].id)
    const [openProfile, setOpenProfile] = useState(false)
    const { userTask } = useContext(PrisonContext)
    const [openLeftDrawer, setOpenLeftDrawer] = useState(false)

    // tracing window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // determining task assigned to the user

    const userList = []

    userTask.map((task) => {
        const item = taskList.find((x) => x.id === task.taskId)
        userList.push(item)

    })


    // rendering user  components
    const wardenTaskList = () => {
        const itemOne = taskList.find((x) => x.id === selected);
        const itemTwo = info.find((y) => y.id === selected)
        if (itemOne) {
            return itemOne ? <>{itemOne.component}</> : <>{itemTwo.component}</>
        } else {
            return itemTwo ? <>{itemTwo.component}</> : <>{itemOne.component}</>
        }



    }



    return (
        <Box className={classes.container}>
            <AppBar sx={{ backgroundColor: '#101F33', zIndex: 1201 }}>
                <Toolbar className={classes.headerContainer}>
                    <button className={classes.menuBtn} onClick={() =>
                        setOpenLeftDrawer(true)
                    }>menu</button>
                    <Typography sx={{ color: "white" }}>welcome {user.fullName}</Typography>
                    <IconButton className={classes.profileBtn} onClick={() => setOpenProfile(true)}>
                        <Avatar src={user.profilePicture}
                            variant="circular"
                            sizes="50"
                            className={classes.avatar}
                        />

                    </IconButton>
                    <Drawer variant='temporary' anchor='right' open={openProfile}
                        onClose={() => setOpenProfile(false)}
                        sx={{
                            width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                                width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#101F33',
                                color: "whitesmoke", paddingTop: "70px",

                            },
                        }}>
                        <Box className={classes.profileContainer}>
                            <Profile user={user} setActive={setActive} />

                        </Box>



                    </Drawer>

                </Toolbar>
            </AppBar>
            <Box>
                <Drawer
                    variant={windowWidth < 700 ? "temporary" : "permanent"}
                    anchor="left"
                    open={windowWidth < 700 ? openLeftDrawer : null}
                    onClose={() => setOpenLeftDrawer(false)}


                    sx={{
                        width: drawerWidth,

                        flexShrink: 0, '& .MuiDrawer-paper': {
                            width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#101F33',
                            color: "whitesmoke", paddingTop: "70px",

                        },
                    }}>
                    <div>

                        <List className={classes.taskList}>
                            {info.map((item) => (
                                <ListItem key={item.id} className={classes.listItem}>
                                    <ListItemButton onClick={() => {
                                        setOpenLeftDrawer(false)
                                        setSelected(item.id)
                                    }
                                    }
                                        className={classes.listButton}>
                                        <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            {item.icon} </ListItemIcon>
                                        <ListItemText primary={item.ItemName} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>


                    </div>
                    <div>
                        <Typography className={classes.mytask}>my task</Typography>
                        <List className={classes.taskList}>
                            {userList.map((item) => (
                                <ListItem key={item.id} className={classes.listItem}>
                                    <ListItemButton onClick={() => {
                                        setOpenLeftDrawer(false)
                                        setSelected(item.id)
                                    }} className={classes.listButton}>
                                        {/* <ListItemIcon sx={{color:'rgba(255,255,255,0.7)'}}>{item.icon} </ListItemIcon> */}
                                        <ListItemText primary={item.taskName} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                    </div>



                </Drawer>
                <Box className={windowWidth < 700 ? classes.laptop : classes.mobile}>
                    {wardenTaskList()}


                </Box>


            </Box>

        </Box>


    )
}
export default Verified


