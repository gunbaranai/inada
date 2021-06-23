import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
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
//import moment from 'moment';

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
  const [reporterName, setReporterName] = React.useState("");
  const [reporterNumber, setReporterNumber] = React.useState("");
  const [reporterEmail, setReporterEmail] = React.useState("");
  const [incident, setIncident] = React.useState("");
  const [partyName, setPartyName] = React.useState("");
  const [publish, setPublish] = React.useState("");
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
              onChange={e => setIncident(e.target.value)}
              value={incident}
              error={incident==""}
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
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Lokasi kejadian perkara"
              id="outlined-size-small"
              placeholder="Lokasi kejadian perkara terjadi"
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl margin="normal" style={{margin: "25px 0px"}}>
            <InputLabel id="demo-simple-select-outlined-label">Lampiran* </InputLabel>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" className={classes.button}>
                + Tambah Lampiran
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
              <MenuItem value={1}>Ya, Publikasikan</MenuItem>
              <MenuItem value={2}>Tidak, Jangan dipublikasikan</MenuItem>
            </Select>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button className={classes.buttonSave}>Simpan</Button>
          <Button className={classes.buttonReset}>Reset</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
