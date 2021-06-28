import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import moment from 'moment';

import img1 from "assets/img/sample_attachment/img-1.jpg"
import img2 from "assets/img/sample_attachment/img-2.jpg"
import img3 from "assets/img/sample_attachment/img-3.jpg"
import img4 from "assets/img/sample_attachment/img-4.jpg"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function Tracker() {
  const classes = useStyles();
  const [ticketNumber, setTicketNumber] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showTicket, setShowTicket] = React.useState(false);

  const handleTrack = (ticketNumber) => {
    if(ticketNumber == 'EGR3MOI0GGRD0V'){
      setShowTicket(true)
    } else {
      setError(true)
    }
  }

  const handleClose = () => {
    setError(false)
  }

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
            {showTicket?
              <div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div>
                    {ticketNumber}
                  </div>
                  <div>
                    14 Juni 2021
                  </div>
                </div>
                <div>
                  Pungli dan premanisme
                </div>
                <div>
                  Aktivitas pungli di dalam ini yang menghambat.
                  Ketika tidak setoran, maka tidak mendapatkan pelayanan.
                  mengelompokan aksi pungli menjadi 2 klaster.
                  Kelompok pertama berada di luar kawasan peti kemas dan para preman ini kerap mengutip Rp 2.000 hingga Rp 5.000 untuk setiap aktivitas logistik.
                  &quot;Kedua pungli di dalam kawasan peti kemas.
                  Pungli ini yang melibatkan karyawan perusahaan peti kemas
                </div>
                <GridContainer>
                  <GridItem md={3}>
                    <div>Pihak yang bersangkutan
                    </div>
                    <div>Waktu kejadian perkara
                    </div>
                    <div>Lokasi  kejadian perkara
                    </div>
                  </GridItem>
                  <GridItem md={9}>
                    <div> : Petugas logistik crane
                    </div>
                    <div> : Setiap hari, biasanya di siang dan sore hari
                    </div>
                    <div> : Logistik di Tanjung Priok
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem md={2}>
                    <img src={img1} />
                  </GridItem>
                  <GridItem md={2}>
                    <img src={img2} />
                  </GridItem>
                  <GridItem md={2}>
                    <img src={img3} />
                  </GridItem>
                  <GridItem md={2}>
                    <img src={img4} />
                  </GridItem>
                </GridContainer>
                <div>
                  Proses Pengaduan
                </div>
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
          Nomor tiket tidak ditemukan!
        </Alert>
      </Snackbar>
    </div>
  );
}
