import { AppBar, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import items from '../api/adminData'

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",

  },
  headerContainer: {
    color: "whitesmoke",
  },
  componentTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
    textDecorationLine: "underline",
    textTransform: "uppercase",
    paddingTop: 5,
    paddingBottom: 7,
  },
  components: {
    marginTop: 60,
    marginLeft: 20,
  },
  header: {

    color: "black",
    position: "fixed",
    width: "100%",

  },
  label: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },

}))



const AdminPage = () => {
  const classes = useStyles()
  const drawerWidth = 220;
  const [selected, setSelected] = useState(items[0].id)

  // rendering admin components
  const adminItem = () => {
    const item = items.find((x) => x.id === selected);
    return item ? <>
      <div className={classes.header}>
        <h3 className={classes.componentTitle}>{item.description}</h3>
      </div>
      <div className={classes.components}>{item.component}</div>
    </> : null

  }
  return (
    <Box className={classes.container}>
      <AppBar sx={{ backgroundColor: '#101F33', zIndex: 1201 }}>
        <Toolbar className={classes.headerContainer}>
          <Typography sx={{ color: "white" }}>admin panel</Typography>

        </Toolbar>
      </AppBar>
      <Box>
        <Drawer sx={{
          width: drawerWidth,
          flexShrink: 0, '& .MuiDrawer-paper': {
            width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#101F33',
            color: "whitesmoke", paddingTop: "70px",

          },
        }}
          variant="permanent"
          anchor="left"
        >

          <List>
            {items.map((item) => (
              <ListItem key={item.id} className={classes.leftButtons}>
                <ListItemButton onClick={() => setSelected(item.id)} >
                  <ListItemText primary={item.label} className={classes.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{ left: "220px", position: "absolute", top: 38 }}>
          {
            adminItem()
          }
        </Box>


      </Box>

    </Box>


  )
}

export default AdminPage