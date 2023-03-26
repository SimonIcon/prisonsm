import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { PrisonContext } from '../api/context'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const useStyles = makeStyles(() => ({
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
    label: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 10,
        alignItems: "center",
        textAlign: "center"
    },
    heading: {
        paddingRight: 30,
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 15,
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
    recordsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
        marginRight: 20
    },
    visitorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    visitor: {
        display: "flex",
        flexDirection: "column"
    },
    values: {
        fontSize: 12,
        fontWeight: "bold",
        padding: 5,
    },
    emptyLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
        textTransform: "capitalize",
    },
    healthContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 30,
        borderBottom: "2 solid balck",
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 20
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        padding: 5,
        textTransform: "capitalize",
        paddingLeft: 20,
    }

}))

const PrisonerRecords = () => {
    const { activePrisoner } = useContext(PrisonContext)
    const classes = useStyles()
    // console.log(activePrisoner)
    // console.log(activePrisoner.visitorRecords)
    return (
        <div className={classes.container}>
            {/* info container */}
            <div className={classes.info}>
                <img src={activePrisoner.prisonerImage} className={classes.image} />
                <div>
                    <Typography className={classes.name}>{activePrisoner.fullName}</Typography>
                    <Typography className={classes.name}>{activePrisoner.PrisonerAdm}</Typography>
                    <Typography className={classes.name}>cell room {4}</Typography>
                </div>
                {/* records container */}

            </div>
            <div className={classes.recordsContainer}>
                {/* prisoner visitor records */}
                <Accordion sx={{ marginTop: 15 }}>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>visitor records</Typography>                    </AccordionSummary>
                    <AccordionDetails className={classes.visitor}>
                        {
                            activePrisoner.visitorRecords ? <>{
                                activePrisoner.visitorRecords.map((visitor) => (
                                    <div key={visitor.id} className={classes.visitorContainer}>
                                        <Typography className={classes.values}>{visitor.visitorName}</Typography>
                                        <Typography className={classes.values}>{visitor.visitedOn.toDate().toDateString()}</Typography>
                                        <Typography className={classes.values}>{visitor.relationshipWithPrisoner}</Typography>
                                    </div>
                                ))

                            }</> : <Typography className={classes.emptyLabel}>no visitor records</Typography>

                        }
                    </AccordionDetails>
                </Accordion>
                {/* prisoner health records */}
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>health records</Typography>                    </AccordionSummary>
                    <AccordionDetails className={classes.visitor}>
                        {
                            activePrisoner.healthRecords ? <>{
                                activePrisoner.healthRecords.map((h) => (
                                    <div key={h.id} className={classes.healthContainer}>
                                        <Typography className={classes.values}>{h.illness}</Typography>
                                        <Typography className={classes.values}>{h.medication}</Typography>
                                        <Typography className={classes.values}>{h.attendee}</Typography>
                                        <Typography className={classes.values}>{h.updatedOn.toDate().toDateString()}</Typography>

                                    </div>
                                ))

                            }</> : <Typography className={classes.emptyLabel}>there are no health records currently</Typography>

                        }
                    </AccordionDetails>
                </Accordion>
                {/* case appeal records */}
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>case appeal records</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.visitor}>
                        {
                            activePrisoner.caseAppeal ? <>{
                                activePrisoner.caseAppeal.map((a) => (
                                    <div key={a.id} className={classes.healthContainer}>
                                        <Typography className={classes.values}>{a.appealDates}</Typography>
                                        <Typography className={classes.values}>{a.courtNumber}</Typography>
                                        <Typography className={classes.values}>{a.lawyer}</Typography>
                                        <Typography className={classes.values}>{a.lawyerAddress}</Typography>

                                    </div>
                                ))

                            }</> : <Typography className={classes.emptyLabel}>there are no case appeal records currently</Typography>

                        }
                    </AccordionDetails>
                </Accordion>
                {/* prisoner duties records */}
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>duties records</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.visitor}>
                        {
                            activePrisoner.duties ? <>{
                                activePrisoner.duties.map((d) => (
                                    <div key={d.id} className={classes.healthContainer}>
                                        <Typography className={classes.values}>{d.day}</Typography>
                                        <Typography className={classes.values}>{d.duty}</Typography>
                                        <Typography className={classes.values}>{d.location}</Typography>
                                        <Typography className={classes.values}>{d.supervisor}</Typography>
                                        <Typography className={classes.values}>{d.updatedOn.toDate().toDateString()}</Typography>

                                    </div>
                                ))

                            }</> : <Typography className={classes.emptyLabel}>there are no case appeal records currently</Typography>

                        }
                    </AccordionDetails>
                </Accordion>
                {/* education details */}
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>education records</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.visitor}>
                        {
                            activePrisoner.educationRecords ? <>{
                                activePrisoner.educationRecords.map((e) => (
                                    <div key={e.id} className={classes.healthContainer}>
                                        <Typography className={classes.values}>{e.program}</Typography>
                                        <Typography className={classes.values}>{e.level}</Typography>
                                        <Typography className={classes.values}>{e.instructor}</Typography>
                                        <Typography className={classes.values}>{e.duration} months</Typography>
                                        <Typography className={classes.values}>{e.updatedOn.toDate().toDateString()}</Typography>

                                    </div>
                                ))

                            }</> : <Typography className={classes.emptyLabel}>there are no education records currently</Typography>

                        }
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    )
}

export default PrisonerRecords