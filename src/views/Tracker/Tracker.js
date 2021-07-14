import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import 'moment/locale/id';
import { fetchTicket, clearTicketError } from "../../redux/actions/aTicket";
import { fetchAttachments } from "../../redux/actions/aAttachments";
import { connect, useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomConnector = withStyles({
  active: {
    '& $line': {
      borderColor: '#1486DC',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#1486DC',
    },
  },
  line: {
    borderColor: '#1486DC',
    borderWidth: 'medium',
    marginLeft: '-2px',
    marginTop: '6px',
    //borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((styles) => ({
  formTitle: {
    color: '#000',
    fontSize: '27px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  formControl: {
    margin: styles.spacing(1),
    minWidth: 120,
  },
  buttonSave: {
    color: '#FFFFFF',
    backgroundColor: '#1486DC',
    width: '120px',
  },
  buttonReset: {
    color: '#1A1A1A',
    backgroundColor: '#ECEDF5',
    width: '120px',
  }
}));

// const steps = [
//   {label: 'Pengaduan berhasil dibuat', timestamp: '15:39 14 Juni 2021'},
//   {label: 'Pengaduan sedang diproses', timestamp: '11:22 15 Juni 2021'},
//   {label: 'Pengaduan selesai diproses', timestamp: '13:33 19 Juni 20222'},
// ]

function Tracker({...props}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ticketNumber, setTicketNumber] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showTicket, setShowTicket] = React.useState(false);
  //const [attachmentLoaded, setAttachmentLoaded] = React.useState(false);

  const handleTrack = (ticketNumber) => {
    if(ticketNumber != ""){
      props.fetchTicket(ticketNumber)
      setShowTicket(true)
    } else {
      setError(true)
    }
  }

  const handleClose = () => {
    setError(false)
    dispatch(clearTicketError())
  }

  // if(props.ticketData.length > 0 && props.attachmentData.length == 0 && attachmentLoaded == false){
  //   console.log(props.attachmentData.length)
  //   setAttachmentLoaded(true)
  //   props.fetchAttachments(props.ticketData[0].id)
  // }

  console.log(props.attachmentData)

  return (
    <div>
      <Card>
        <CardBody style={{padding: "48px 64px 64px 64px"}}>
          <div className={classes.formTitle}>Lacak Pengaduan</div>
            <GridContainer>
              <GridItem md={9}>
                <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                  <TextField
                    label="Nomor Tiket Pengaduan"
                    id="outlined-size-small"
                    placeholder="Nomor Tiket Pengaduan"
                    variant="outlined"
                    size="small"
                    onChange={e => setTicketNumber(e.target.value)}
                    value={ticketNumber}
                    //error={partyName==""}
                  />
                </FormControl>
              </GridItem>
              <GridItem md={3} style={{alignSelf: "center", textAlign: "center"}}>
                <Button onClick={() => handleTrack(ticketNumber)} className={classes.buttonSave}>Cari</Button>
              </GridItem>
            </GridContainer>
            {showTicket && props.ticketData.length != 0?
              <div>
                <hr style={{marginBottom: "32px"}} />
                <div style={{marginBottom: "4px", display: "flex", justifyContent: "space-between"}}>
                  <div style={{color: "#8B92A0", fontSize: "16px", fontWeight: "700"}}>
                    {props.ticketData[0].report_code}
                  </div>
                  <div style={{color: "#8B92A0", fontSize: "12px", fontWeight: "400"}}>
                    {moment(props.ticketData[0].created_date).format('DD MMMM YYYY')}
                  </div>
                </div>
                <div style={{marginBottom: "12px", color: "#1A1A1A", fontSize: "20px", fontWeight: "600"}}>
                  {props.ticketData[0].information}
                </div>
                <div style={{marginBottom: "12px", color: "#1A1A1A", fontSize: "14px", fontWeight: "400"}}>
                  {props.ticketData[0].detail}
                </div>
                <GridContainer style={{color: "#1A1A1A", fontSize: "14px", fontWeight: "400"}}>
                  <GridItem md={3}>
                    <div>
                      Pihak yang bersangkutan
                    </div>
                    <div>
                      Waktu kejadian perkara
                    </div>
                    <div>
                      Lokasi  kejadian perkara
                    </div>
                  </GridItem>
                  <GridItem md={9}>
                    <div>
                      :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData[0].related_parties}
                    </div>
                    <div>
                      :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData[0].time_occurrence}
                    </div>
                    <div>
                      :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData[0].location_detail}
                    </div>
                  </GridItem>
                </GridContainer>
                <div style={{marginTop: "16px"}}>
                  <GridContainer>
                    {props.ticketData[0].attachments.map((attachment) =>
                      <GridItem md={2} key={attachment.id}>
                        <img width='80px' src={'http://172.105.119.140/attachments/'+attachment.file_name} />
                      </GridItem>
                    )}
                  </GridContainer>
                </div>
                <div style={{marginTop: "24px", color: "#1A1A1A", fontSize: "20px", fontWeight: "600"}}>
                  Proses Pengaduan
                </div>
                <Stepper activeStep={props.ticketData[0].histories.length} orientation="vertical" connector={<CustomConnector />}>
                  {props.ticketData[0].histories.map((step) => {
                    console.log(step)
                    return (
                      <Step key={step.detail_information}>
                        <StepLabel>
                          <div style={{color: "#1A1A1A", fontSize: "14px", fontWeight: "400"}}>{step.detail_information}</div>
                          <div style={{color: "#8B92A0", fontSize: "10px", fontWeight: "400"}}>{moment(step.created_date).format('h:mm DD MMMM YYYY')}</div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </div>
            :null}
        </CardBody>
      </Card>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Nomor tiket tidak boleh kosong!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={props.ticketError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Nomor tiket tidak ditemukan!
        </Alert>
      </Snackbar>
    </div>
  );
}

const ticketPropTypes = {
  ticketData: PropTypes.array,
  ticketProgress: PropTypes.bool,
  ticketError: PropTypes.bool,
  fetchTicket: PropTypes.func,

  attachmentData: PropTypes.array,
  attachmentProgress: PropTypes.bool,
  fetchAttachments: PropTypes.func,
}

Tracker.propTypes = ticketPropTypes

const mapStateToProps = (state) => {
  return {
    ticketData: state.ticketStore.data,
    ticketProgress: state.ticketStore.inProgress,
    ticketError: state.ticketStore.isError,

    attachmentData: state.attachmentStore.data,
    attachmentProgress: state.attachmentStore.inProgress,
  }
}

export default connect(mapStateToProps, {fetchTicket, fetchAttachments})(Tracker)
