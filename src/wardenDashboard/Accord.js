import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Accord() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                        risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                        nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin
                        porttitor, orci nec nonummy molestie, enim est eleifend mi, non
                        fermentum diam nisl sit amet erat. Duis semper.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary

                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                        risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                        nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin
                        porttitor, orci nec nonummy molestie, enim est eleifend mi, non
                        fermentum diam nisl sit amet erat. Duis semper.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary

                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>Accordion 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                        risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                        nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin
                        porttitor, orci nec nonummy molestie, enim est eleifend mi, non
                        fermentum diam nisl sit amet erat. Duis semper.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
