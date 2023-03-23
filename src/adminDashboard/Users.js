import { Box, List, ListItem, ListItemText, MenuItem, Modal, Select, Typography } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context';
import taskList from '../api/taskData';


const useStyles = makeStyles((theme) => ({
  cardContainer: {
    height: "50vh",
    display: "flex",
    flexDirection: "row",
    width: "75vw",
    flex: 1,
    justifyContent: "space-between",


  },
  image: {
    height: "80%",
    width: "20vw",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "20%",

  },
  detailContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 25,
    paddingTop: 5,
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
  },
  detailTitle: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "black",
    letterSpacing: 1,
  },
  addBtn: {
    width: "17vw",
    backgroundColor: "palegreen",
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
  },
  removeBtn: {
    width: "17vw",
    backgroundColor: "red",
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
  },
  deactivateBtn: {
    width: "17vw",
    backgroundColor: "pink",
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
  taskDetails: {
    marginLeft: 40,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    aliignItems: "center",
  },
  taskTitle: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "black",
    letterSpacing: 1,

  },
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    width: "50vw",
    height: "50vh",
    position: "absolute",
    marginTop: "20vh",
    marginLeft: "30vw",
  },
  modalConatiner: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",

  },
  title: {
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    letterSpacing: "1px",
    marginLeft: 20,
  },
  selectContainer: {
    width: "70%",
    borderRadius: 20,
    marginLeft: 20,
    textAlign: "center",
    textDecorationLine: "none",
    paddingTop: 5,
    paddingBottom: 5,
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuItem: {
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: "70%",
    marginLeft: 20,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center"
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"

  },
  taskName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  removeTaskBtn: {
    color: "black",
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: "center",
    borderRadius: 15,
    fontSize: 13,
    fontWeight: "bold",
    backgroundColor: "pink",
    textTransform: "capitalize",
    marginLeft: 15,

  },
  noTask: {
    display: "flex",
    fontWeight: "bold",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,

  }



}))

const Users = () => {
  const classes = useStyles();
  const { wardens, removeWarden } = useContext(PrisonContext);
  const [openAddTask, setOpenAddTask] = useState(false)
  const [selectTask, setSelectedTask] = useState('');
  const { handleAddTask, error } = useContext(PrisonContext)
  const [activeWarden, setActiveWarden] = useState([])
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState('');

  return (
    <Box container>
      {
        wardens.map((warden) => (
          <Box key={warden.id}>
            {
              warden.status === "active" ? <Box className={classes.cardContainer}>
                <img src={warden.profilePicture} className={classes.image} />
                <div className={classes.detailContainer}>
                  <Typography className={classes.detailTitle}>warden details</Typography>
                  <div className={classes.detail}>
                    <Typography className={classes.detailLabel}>name :</Typography>
                    <Typography className={classes.detailValue}>{warden.fullName}</Typography>

                  </div>
                  <div className={classes.detail}>
                    <Typography className={classes.detailLabel}>email :</Typography>
                    <Typography className={classes.detailValue}>{warden.email}</Typography>
                  </div>
                  <div className={classes.detail}>
                    <Typography className={classes.detailLabel}>workId :</Typography>
                    <Typography className={classes.detailValue}>{warden.workId}</Typography>
                  </div>
                  {/* add task modal */}
                  <Modal
                    open={openAddTask}
                    onClose={() => setOpenAddTask(false)}
                    className={classes.modal}
                  >
                    <div className={classes.modalConatiner}>
                      <Typography className={classes.title}>add task to {activeWarden.fullName}</Typography>
                      {error ? <Typography className={classes.error}>{error}</Typography> : null}
                      <Select value={selectTask} onChange={(e) => setSelectedTask(e.target.value)}
                        className={classes.selectContainer}
                      >
                        {
                          taskList.map((task) => (
                            <MenuItem key={task.id} value={task.taskName} className={classes.menuItem}
                              onClick={() => {
                                setDescription(task.taskDescription)
                                setTaskId(task.id)
                              }}>

                              {task.taskName}</MenuItem>
                          ))
                        }
                      </Select>
                      {description ? <Typography>{taskList.description} </Typography> : null}
                      <button className={classes.button}
                        onClick={() => {
                          handleAddTask(selectTask, activeWarden.id, description, taskId)
                          setTimeout(() => {
                            setOpenAddTask(false)
                          }, 2000)
                        }
                        }



                      >add task</button>

                    </div>

                  </Modal>

                  <div className={classes.buttons}>
                    <button className={classes.addBtn} onClick={() => {
                      setOpenAddTask(true);
                      setActiveWarden(warden)
                    }}>add task</button>
                    <button className={classes.removeBtn}
                      onClick={() => {
                        setActiveWarden(warden)
                        // console.log(activeWarden)
                        removeWarden(activeWarden.id)
                      }
                      }
                    >remove {warden.fullName}</button>


                  </div>
                </div>
                <div className={classes.taskDetails}>
                  {
                    warden.tasks ? <div>
                      {
                        warden.tasks.length > 0 ? <div>
                          <Typography className={classes.taskTitle}>task assigned</Typography>
                          <List className={classes.taskList}>
                            {
                              warden.tasks.map((task) => (
                                <ListItem key={task.id} className={classes.ListItem}>
                                  <ListItemText primary={task.taskName} className={classes.taskName} />
                                  <ListItemButton className={classes.removeTaskBtn}>remove task</ListItemButton>

                                </ListItem>
                              ))
                            }
                          </List>

                        </div> : null
                      }

                    </div> : <Typography className={classes.noTask}>{warden.fullName} has not be assigned to any task</Typography>
                  }

                </div>
              </Box> : null
            }

          </Box >

        ))
      }

    </Box >
  )
}

export default Users