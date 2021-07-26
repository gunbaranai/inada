import React from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import cookie from "react-cookies";

import { Add, Close } from '@material-ui/icons';
//import moment from 'moment';

import fileImage from "assets/img/file.png";
import clipboardImage from "assets/img/clipboard.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const styles = {
//   formTitle: {
//     color: '#000',
//     fontSize: '27px',
//     fontWeight: '700',
//     marginBottom: '8px',
//   },
//   formControl: {
//     //margin: theme.spacing(1),
//     minWidth: 120,
//   },
// };

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
    marginRight: '24px',
  },
  buttonReset: {
    color: '#1A1A1A',
    backgroundColor: '#ECEDF5',
    width: '120px',
  }
}));

export default function Report() {
  const classes = useStyles();
  const [confidentiality, setConfidentiality] = React.useState("");
  const [reporterName, setReporterName] = React.useState(cookie.load("name")?cookie.load("name"):"");
  const [reporterNumber, setReporterNumber] = React.useState(cookie.load("phone")?cookie.load("phone"):"");
  const [reporterEmail, setReporterEmail] = React.useState(cookie.load("email")?cookie.load("email"):"");
  const [incident, setIncident] = React.useState("");
  const [incidentDetail, setIncidentDetail] = React.useState("");
  const [incidentTime, setIncidentTime] = React.useState("");
  const [incidentLocation, setIncidentLocation] = React.useState("");
  const [partyName, setPartyName] = React.useState("");
  const [attachments, setAttachments] = React.useState([]);
  const [publish, setPublish] = React.useState("");
  const [saved, save] = React.useState("");
  //const [loaded, loading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  const handleCopyToClipboard = (ticketNumber) => {
    setCopied(true)
    navigator.clipboard.writeText(ticketNumber)
  }

  const handleSave = () => {
    if(confidentiality-1 < 0 || incident == '' || incidentDetail == '' || publish-1 < 0){
      setFormError("Formulir tidak lengkap!")
    } else {
      if(confidentiality-1 == 1){
        if(reporterName == '' || (reporterEmail == '' && reporterNumber == '')){
          setFormError("Formulir tidak lengkap!")
        } else {
          handleSend()
        }
      } else {
        handleSend()
      }
    }
  }

  const fileData = (files, id) => {
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('file', files[i])
    }
    data.append('report_id', id)
    console.log(data)
    return data
  }

  const handleSend = () => {
    //loading(true)
    console.log(
      '{ type : ', confidentiality-1,
      ', information : ', incident,
      ', detail : ', incidentDetail,
      ', related_parties : ', partyName,
      ', time_occurence : ', incidentTime,
      ', location_detail : ', incidentLocation,
      ', is_published : ', publish-1,
      ', informer : ', reporterName,
      ', phone_no : ', reporterNumber,
      ', email_address : ', reporterEmail,
      ', files : ', attachments,
    )

    const getParams = (auth) => {
      if(auth){
        return {
          method: "post",
          url: "http://172.105.119.140:8086/api/report",
          headers: {
            Authorization: auth
          },
          data: {
            type: (confidentiality-1).toString(),
            information: incident,
            detail: incidentDetail,
            related_parties: partyName,
            time_occurrence: incidentTime,
            location_detail: incidentLocation,
            is_published: (publish-1).toString(),
            informer: reporterName,
            phone_no: reporterNumber,
            email_address: reporterEmail,
          }
        }
      } else {
        return {
          method: "post",
          url: "http://172.105.119.140:8086/api/report",
          data: {
            type: (confidentiality-1).toString(),
            information: incident,
            detail: incidentDetail,
            related_parties: partyName,
            time_occurrence: incidentTime,
            location_detail: incidentLocation,
            is_published: (publish-1).toString(),
            informer: reporterName,
            phone_no: reporterNumber,
            email_address: reporterEmail,
          }
        }
      }
    }

    axios(getParams(cookie.load("token")))
    .then((response) => {
      if(response.status == 200){
        if(response.data.status == "success"){
          //loading(false)
          if(attachments.length > 0){
            axios({
              method: "post",
              url: "http://172.105.119.140:8086/api/report/upload",
              data: fileData(attachments, response.data.data[0].id),
            })
            .then((uploadResponse) => {
              if(uploadResponse.status == 200){
                if(uploadResponse.data.status == "success"){
                  //loading(false)
                  console.log(uploadResponse.data)
                  save(response.data.data[0].report_code)
                } else {
                  setFormError("Pengunggahan lampiran gagal!") // ganti message
                }
              } else {
                setFormError("Pengunggahan lampiran gagal!") // ganti message
              }
            })
            .catch(function(uploadError){
              //loading(false)
              if(uploadError.response){
                if(uploadError.response.status == 401 || uploadError.response.status == 403 || uploadError.response.status == 400){
                  setFormError("Terjadi kesalahan pada pengiriman data!") // ganti message nanti
                } else if(uploadError.response.status === 404 || uploadError.response.status === 500){
                  setFormError("Server tak dapat dihubungi!") //"Server cannot be contacted! Please ask your system administrator!: Enum"
                } else {
                  setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Something went wrong... Please try again later..."
                }
              } else if(uploadError.request){
                setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Request have no response! Please check on your internet connection and refresh this page."
              } else {
                setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Something went wrong... Please try again later..."
              }
            })
          } else {
            console.log(response.data)
            save(response.data.data[0].report_code)
          }
        } else {
          setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") // ganti message
        }
      } else {
        setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") // ganti message
      }
    })
    .catch(function(error){
      //loading(false)
      if(error.response){
        if(error.response.status == 401 || error.response.status == 403 || error.response.status == 400){
          setFormError("Terjadi kesalahan pada pengiriman data!") // ganti message nanti
        } else if(error.response.status === 404 || error.response.status === 500){
          setFormError("Server tak dapat dihubungi!") //"Server cannot be contacted! Please ask your system administrator!: Enum"
        } else {
          setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Something went wrong... Please try again later..."
        }
      } else if(error.request){
        setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Request have no response! Please check on your internet connection and refresh this page."
      } else {
        setFormError("Terjadi kesalahan, periksa koneksi anda dan coba lagi.") //"Something went wrong... Please try again later..."
      }
    })
  }

  const handleReset = () => {
    setConfidentiality
  }

  return (
    <div>
      <Card>
        <CardBody style={{padding: "48px 64px 64px 64px"}}>
          <div className={classes.formTitle}>Buat Pengaduan</div>
          <FormControl variant="outlined" fullWidth margin="normal" style={{margin: "25px 0px"}} className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Informasi Pengaduan*</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={confidentiality}
              onChange={e => setConfidentiality(e.target.value)}
              label="Informasi Pengaduan*"
              error={confidentiality==""}
            >
              <MenuItem value={1}>Disamarkan</MenuItem>
              <MenuItem value={2}>Tidak disamarkan</MenuItem>
            </Select>
          </FormControl>
          {confidentiality==2?
            <div>
              <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                <TextField
                  label="Nama Pengadu*"
                  id="outlined-size-small"
                  placeholder="Nama yang melakukan pengaduan"
                  variant="outlined"
                  size="small"
                  onChange={e => setReporterName(e.target.value)}
                  value={reporterName}
                  error={reporterName==""}
                />
              </FormControl>
              <GridContainer>
                <GridItem md={6}>
                  <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                    <TextField
                      label="No. Hp"
                      id="outlined-size-small"
                      placeholder="Nomor yang bisa dihubungi"
                      type="number"
                      variant="outlined"
                      size="small"
                      onChange={e => setReporterNumber(e.target.value)}
                      value={reporterNumber}
                    />
                  </FormControl>
                </GridItem>
                <GridItem md={6}>
                  <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                    <TextField
                      label="E-Mail"
                      id="outlined-size-small"
                      placeholder="Email yang bisa dihubungi"
                      variant="outlined"
                      size="small"
                      onChange={e => setReporterEmail(e.target.value)}
                      value={reporterEmail}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <div style={{fontSize: "10px", marginTop: "-24px"}}>
                Isi minimal salah satu informasi kontak (No.HP / E-mail) untuk mempermudah menindak lanjuti pengaduan yang disampaikan.
              </div>
            </div>
          :
            null
          }
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Kejadian Perkara*"
              id="outlined-size-small"
              placeholder="Kejadian Perkara yang ingin dilaporkan"
              variant="outlined"
              size="small"
              onChange={e => setIncident(e.target.value)}
              value={incident}
              error={incident==""}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Detil Kejadian Perkara*"
              id="outlined-size-small"
              placeholder="Detil kejadian Perkara yang ingin dilaporkan"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              onChange={e => setIncidentDetail(e.target.value)}
              value={incidentDetail}
              error={incidentDetail==""}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Pihak yang bersangkutan"
              id="outlined-size-small"
              placeholder="Pihak terkait dengan kejadian perkara"
              variant="outlined"
              size="small"
              onChange={e => setPartyName(e.target.value)}
              value={partyName}
              //error={partyName==""}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            {/*<TextField
              id="datetime-local"
              label="Waktu kejadian perkara"
              type="datetime-local"
              defaultValue={moment}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />*/}
            <TextField
              label="Waktu kejadian perkara"
              id="outlined-size-small"
              placeholder="Waktu kejadian perkara terjadi"
              variant="outlined"
              size="small"
              onChange={e => setIncidentTime(e.target.value)}
              value={incidentTime}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Lokasi kejadian perkara"
              id="outlined-size-small"
              placeholder="Lokasi kejadian perkara terjadi"
              variant="outlined"
              size="small"
              onChange={e => setIncidentLocation(e.target.value)}
              value={incidentLocation}
            />
          </FormControl>
          <FormControl margin="normal" style={{margin: "25px 0px"}}>
            <InputLabel id="demo-simple-select-outlined-label">Lampiran* </InputLabel>
            <input
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={e => setAttachments(e.target.files)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" className={classes.button}>
                <Add /> Tambah Lampiran
              </Button>
            </label>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal" style={{margin: "25px 0px"}} className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Publikasi*</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={publish}
              onChange={e => setPublish(e.target.value)}
              label="Publikasi*"
              placeholder="Publikasi pengaduan yang anda buat ?"
              error={publish==""}
            >
              <MenuItem value={2}>Ya, Publikasikan</MenuItem>
              <MenuItem value={1}>Tidak, Jangan dipublikasikan</MenuItem>
            </Select>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button className={classes.buttonSave} onClick={() => handleSave()}>Simpan</Button>
          <Button className={classes.buttonReset} onClick={() => handleReset()}>Reset</Button>
        </CardFooter>
      </Card>

      <Dialog open={saved != ""} onClose={() => save("")}>
        <DialogTitle style={{textAlign: "right"}}>
          <Close fontSize="large" style={{cursor: "pointer"}} onClick={() => save("")} />
        </DialogTitle>
        <DialogContent style={{margin: "0px 64px 64px 64px", textAlign: "center"}}>
          <img src={fileImage} />
          <div style={{fontWeight: "700", fontSize: "28px", textAlign: "left"}}>
            Pengaduan berhasil dibuat !
          </div>
          <div style={{fontWeight: "400", fontSize: "16px", textAlign: "justify", marginTop: "8px", marginBottom: "32px"}}>
            Mohon catat nomor tiket dibawah ini, untuk dapat melacak perkembangan kasus pengaduan.
          </div>
          <Button style={{fontSize: "36px"}} onClick={() => handleCopyToClipboard(saved)}>
            {saved}<img style={{marginLeft: "16px"}} src={clipboardImage} />
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={copied}
        autoHideDuration={6000}
        onClose={() => setCopied(false)}
      >
        <Alert onClose={() => setCopied(false)} severity="success">
          Nomor tiket berhasil disalin!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={formError != ""}
        autoHideDuration={6000}
        onClose={() => setFormError("")}
      >
        <Alert onClose={() => setFormError("")} severity="error">
          {formError}
        </Alert>
      </Snackbar>
    </div>
  );
}
