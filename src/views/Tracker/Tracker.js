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
                <Button className={classes.buttonSave}>Cari</Button>
              </GridItem>
            </GridContainer>
        </CardBody>
      </Card>
    </div>
  );
}
