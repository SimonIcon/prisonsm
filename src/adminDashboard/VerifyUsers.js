import { Box, Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { PrisonContext } from '../api/context';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    height: "50vh",
    display: "flex",
    flexDirection: "row",
    width: 600,
    padding: 10,
    marginLeft: 30,
  },
  container: {
    display: "flex",
    flexDirection: "column"


  },
  image: {
    height: "80%",
    width: "47%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "20%"
  },
  detailsContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "center",
    flex: 1,
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,

  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "900",
    textTransform: "capitalize",
    paddingRight: 15,
    textAlign: "flex-start",
    marginRight: 30,

  },
  detailValue: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    fontStyle: "italic",
    textAlign: "flex-start"


  },
  verificationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,


  },
  verifyBtn: {
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "palegreen",
    borderRadius: 20,
    width: 200,
    textTransform: "capitalize",
  },
  title: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "black",
    letterSpacing: 1,
  },
  denyBtn: {
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "red",
    borderRadius: 20,
    width: 200,
    textTransform: "capitalize",
    marginTop: 10,

  }




}))

const VerifyUsers = () => {
  const classes = useStyles();
  const { wardens, verifyWarden } = useContext(PrisonContext);
  const [comment, setComment] = useState('')
  const [activeWarden, setActiveWarden] = useState([])



  return (

    <Box container>
      {
        wardens.map((warden) => (
          <Box key={warden.id}>
            {
              warden.status === "persive" ?

                <Card className={classes.cardContainer} elevation raised >
                  <CardMedia
                    image={warden.profilePicture}
                    className={classes.image}
                  />
                  <div className={classes.detailsContainer}>
                    <Typography className={classes.title}>warden detail</Typography>
                    {comment ? <Typography className={classes.comment}>{comment}</Typography> : null}
                    <div className={classes.detail}>
                      <Typography className={classes.detailLabel}>name </Typography>
                      <Typography className={classes.detailValue}>{warden.fullName}</Typography>
                    </div>
                    <div className={classes.detail}>
                      <Typography className={classes.detailLabel}>email </Typography>
                      <Typography className={classes.detailValue}>{warden.email}</Typography>
                    </div>
                    <div className={classes.detail}>
                      <Typography className={classes.detailLabel}>workId </Typography>
                      <Typography className={classes.detailValue}>{warden.workId}</Typography>
                    </div>
                    <div className={classes.verificationContainer}>
                      <button className={classes.verifyBtn} onClick={() => {
                        setActiveWarden(warden)
                        verifyWarden(activeWarden.id)

                      }}>verify {warden.fullName}</button>
                      <button className={classes.denyBtn}>deny verification</button>
                    </div>
                  </div>

                </Card> : null
            }
          </Box>

        ))
      }

    </Box >
  )
}

export default VerifyUsers