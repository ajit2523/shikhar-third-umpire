import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Info } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '70%',
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    webkitScrollbarThumb: {
        borderRadius: '5px',
    },
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>
                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99998 4.05408H9.33173V6.05882C9.33173 6.92887 8.77139 7.66368 7.99524 7.94047V12.073H12.673C13.041 12.073 13.3412 11.7735 13.3412 11.4048V8.06356H11.3365C10.9671 8.06356 10.6682 7.76467 10.6682 7.39531V4.72232C10.6682 4.35363 10.368 4.05408 9.99998 4.05408Z" fill="white" />
                    <path d="M10 17.419C14.79 17.419 18.6872 13.5217 18.6872 8.73176C18.6872 3.94176 14.79 0 10 0C5.90093 0 2.46427 2.90179 1.55563 6.72702H7.32701C7.69508 6.72702 7.99526 6.42746 7.99526 6.05877V3.38578C7.99526 3.01642 8.29414 2.71754 8.66351 2.71754H10C11.1055 2.71754 12.0047 3.61682 12.0047 4.72228V6.72702H14.0095C14.3788 6.72702 14.6777 7.0259 14.6777 7.39526V11.4047C14.6777 12.5102 13.7784 13.4095 12.673 13.4095C12.5005 13.4095 2.0933 13.4095 2.69147 13.4095C4.23766 15.8168 6.9327 17.419 10 17.419Z" fill="white" />
                    <path d="M1.34666 8.06348C1.32969 8.2848 1.31281 8.50617 1.31281 8.73172C1.31281 9.91537 1.55248 11.0437 1.9831 12.073H6.65878V8.06348H1.34666Z" fill="white" />
                    <path d="M0.840344 20.0692L3.84745 19.2639L4.65274 22.3143C4.72321 22.5753 4.94378 22.7685 5.21134 22.8037C5.48528 22.8395 5.74474 22.7047 5.87696 22.4755L8.10548 18.5703C5.81139 18.1293 3.79484 16.9059 2.34332 15.187L0.0898579 19.0897C-0.0458852 19.324 -0.0262834 19.6163 0.13815 19.8304C0.301291 20.0451 0.583202 20.1397 0.840344 20.0692Z" fill="white" />
                    <path d="M19.1597 20.0692C19.4155 20.1397 19.6974 20.0451 19.8619 19.8304C20.0263 19.6163 20.0459 19.324 19.9101 19.0897L17.6567 15.187C16.2052 16.9059 14.1886 18.1293 11.8945 18.5703L14.123 22.4755C14.2553 22.7055 14.5149 22.8394 14.7887 22.8037C15.0562 22.7685 15.2768 22.5753 15.3473 22.3143L16.1526 19.2639L19.1597 20.0692Z" fill="white" />
                </svg>

            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <b className="tips-heading">Best Practices</b><br /><br />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div>
                                <div>💡 <b>To find out the cluster/geo/zone leaderboard for any product for any week</b>
                                    <ul>Ex 1 - HL Cluster leaderboard for cohort disb &gt; 30 cr cohort for week 5 in august</ul>
                                    <ul>Ex 2 - MSME Cluster leaderboard for cohort disb between 18 to 24 cr <i>*(without mentioning week and month, it will assume the latest week of the current month)</i></ul>
                                    <ul>Ex 3 - UBL Cluster leaderboard <i>*(without mentioning cohort, it will give results for all cohorts)</i></ul>
                                    <ul>Ex 4 - Zone leaderboard for PL</ul>
                                    <ul>Ex 5 - Geo leaderboard for MSME</ul>
                                    <ul>Ex 6 - UCL Cluster leaderboard</ul>

                                    <p>💡 <b>To compare individual performance </b></p>
                                    <ul>Ex 1 - How many runs Rohit Sharma must score to rank above Prabir Paul</ul>
                                    <ul>Ex 2 - Show me the performance summary with rank for brahma.srivastva@piramal.com and deepakkumar.dubey@piramal.com</ul>
                                    <ul>Ex 3 - Rank of prabir.paul@piramal.com</ul>
                                    <ul><i>*(prefer using Email IDs over names for individual level queries)</i></ul>

                                    <p>💡 <b>My performance </b></p>
                                    <ul>Ex 1 - Show me my disb amount, disb target, runs, rank for each week</ul>

                                    <p>💡 <b>Cluster/Zone/Geo level queries</b></p>
                                    <ul>Ex 1 - What is bangalore cluster rank for HL</ul>
                                    <ul>Ex 2 - What is the current rank for south zone for MSME</ul>
                                    <ul>Ex 3 - What is the disb and booster amount done by north zone for HL</ul>

                                    <p>💡 <b>Branch queries of SMs and RMs</b></p>
                                    <ul>Ex 1 - Tell me Patna branch rankings for HL</ul>
                                    <ul>Ex 2 - Compare between SM arjun.kumar2@piramal.com and aniket.kumar@piramal.com</ul>

                                    <p className="tips-heading"><b><b className="warning">⚠</b> <i>This is an AI powered chat-bot, hence, if not satisfied with the answer, please REWORD your query</i></b></p>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}