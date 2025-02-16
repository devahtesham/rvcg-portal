import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import FileUpload from '../../FileUpload/FileUpload';

export default function SimpleAccordian() {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='fw-bolder'
                >
                    Other Information
                </AccordionSummary>
                <AccordionDetails>
                    <FileUpload />
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
