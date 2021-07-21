import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import 'moment/locale/id';
import { KeyboardBackspace } from '@material-ui/icons';
import { fetchTicket, clearTicketError } from "../../redux/actions/aTicket";
import { fetchLogin, checkAuth } from "../../redux/actions/aLogin";
import { fetchAttachments } from "../../redux/actions/aAttachments";
import { connect, useDispatch } from "react-redux";
import red from "../../assets/img/red.svg";
import yellow from "../../assets/img/yellow.svg";
import green from "../../assets/img/green.svg";
import blue from "../../assets/img/blue.svg";

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
    marginBottom: '24px',
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

function MyCase({...props}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const [listLoaded, setListLoaded] = React.useState(false);
  const [activeTicket, setActiveTicket] = React.useState(-1);

  const handleClose = () => {
    setError(false)
    dispatch(clearTicketError())
  }

  const statusIcon = (status) => {
    switch (status) {
      case 1:
        return yellow
      case 2:
        return red
      case 3:
        return blue
      case 4:
        return green
      default:
        return yellow
    }
  }

  if(props.ticketData.length == 0 && props.authData.length != 0 && listLoaded == false){
    console.log(props.authData.token)
    setListLoaded(true)
    props.fetchTicket("", props.authData.token)
  }

  console.log(props.authData, props.ticketData)

  return (
    <div>
      {props.isAuthenticated?
        <Card>
          <CardBody style={{padding: "48px 64px 64px 64px"}}>
              {activeTicket >= 0 && props.ticketData.length != 0?
                <div>
                  <KeyboardBackspace style={{marginBottom: '24px', cursor: 'pointer'}} onClick={() => setActiveTicket(-1)} />
                  <div style={{marginBottom: "4px", display: "flex", justifyContent: "space-between"}}>
                    <div style={{color: "#8B92A0", fontSize: "16px", fontWeight: "700"}}>
                      {props.ticketData.filter(x => x.id == activeTicket)[0].report_code}
                    </div>
                    <div style={{color: "#8B92A0", fontSize: "12px", fontWeight: "400"}}>
                      {moment(props.ticketData.filter(x => x.id == activeTicket)[0].created_date).format('DD MMMM YYYY')}
                    </div>
                  </div>
                  <div style={{marginBottom: "12px", color: "#1A1A1A", fontSize: "20px", fontWeight: "600"}}>
                    {props.ticketData.filter(x => x.id == activeTicket)[0].information}
                  </div>
                  <div style={{marginBottom: "12px", color: "#1A1A1A", fontSize: "14px", fontWeight: "400"}}>
                    {props.ticketData.filter(x => x.id == activeTicket)[0].detail}
                  </div>
                  <GridContainer style={{color: "#1A1A1A", fontSize: "14px", fontWeight: "400"}}>
                    <GridItem md={5}>
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
                    <GridItem md={7}>
                      <div>
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData.filter(x => x.id == activeTicket)[0].related_parties}
                      </div>
                      <div>
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData.filter(x => x.id == activeTicket)[0].time_occurrence}
                      </div>
                      <div>
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.ticketData.filter(x => x.id == activeTicket)[0].location_detail}
                      </div>
                    </GridItem>
                  </GridContainer>
                  <div style={{marginTop: "16px"}}>
                    <GridContainer>
                      {props.ticketData.filter(x => x.id == activeTicket)[0].attachments.map((attachment) =>
                        <GridItem md={2} key={attachment.id}>
                          <img width='80px' src={'http://172.105.119.140/attachments/'+attachment.file_name} />
                        </GridItem>
                      )}
                    </GridContainer>
                  </div>
                  <div style={{marginTop: "24px", color: "#1A1A1A", fontSize: "20px", fontWeight: "600"}}>
                    Proses Pengaduan
                  </div>
                  <Stepper activeStep={props.ticketData.filter(x => x.id == activeTicket)[0].histories.length} orientation="vertical" connector={<CustomConnector />}>
                    {props.ticketData.filter(x => x.id == activeTicket)[0].histories.map((step) => {
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
              :
                <div>
                  <div className={classes.formTitle}>Daftar Pengaduan</div>
                  {props.ticketData.map((ticket) =>
                    <Button
                      key={ticket.id}
                      style={{width: '100%', justifyContent: 'space-around', padding: '8px 16px', fontSize: '14px', border: '0.5px solid #C4CDE0', background: '#FFFFFF'}}
                      onClick={() => setActiveTicket(ticket.id)}
                    >
                      <GridContainer style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <GridItem sm={1}>
                          <img style={{verticalAlign: 'middle'}} src={statusIcon(ticket.status)}/>
                        </GridItem>
                        <GridItem sm={3} style={{color: '#1A1A1A', textAlign: 'left', alignSelf: 'center'}}>
                          {ticket.report_code}
                        </GridItem>
                        <GridItem sm={3} style={{color: '#1A1A1A', textAlign: 'left', alignSelf: 'center'}}>
                          {ticket.information}
                        </GridItem>
                        <GridItem sm={3} style={{color: '#A5AEC2', textAlign: 'left', alignSelf: 'center'}}>
                          {ticket.detail}
                        </GridItem>
                        <GridItem sm={2} style={{color: '#A5AEC2', textAlign: 'right', alignSelf: 'center'}}>
                          {moment(ticket.created_date).format("DD MMMM YYYY")}
                        </GridItem>
                      </GridContainer>
                    </Button>
                  )}
                </div>
              }
          </CardBody>
        </Card>
      :
        <Redirect from="/" to="/login" />
      }

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

  authData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  fetchLogin: PropTypes.func,
  checkAuth: PropTypes.func,
}

MyCase.propTypes = ticketPropTypes

const mapStateToProps = (state) => {
  return {
    ticketData: state.ticketStore.data,
    ticketProgress: state.ticketStore.inProgress,
    ticketError: state.ticketStore.isError,

    attachmentData: state.attachmentStore.data,
    attachmentProgress: state.attachmentStore.inProgress,

    isAuthenticated: state.authStore.isAuthenticated,
    authData: state.authStore.authData,
  }
}

export default connect(mapStateToProps, {fetchTicket, fetchAttachments, fetchLogin, checkAuth})(MyCase)
