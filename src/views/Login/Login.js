import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'moment/locale/id';
import { fetchLogin } from "../../redux/actions/aLogin";
import { connect } from "react-redux";
import cookie from "react-cookies";

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
const titleSelector = {
  flex: 1,
  textAlign: "left",
  display: "flex",
  flexDirection: "row",
}
const inactiveButtonStyle = {
  fontSize: '18px',
  color: '#A5AEC2',
  fontWeight: '600',
}
const activeButtonStyle = {
  fontSize: '18px',
  color: '#1A1A1A',
  fontWeight: '600',
  borderBottom: '1px solid black',
}

// const steps = [
//   {label: 'Pengaduan berhasil dibuat', timestamp: '15:39 14 Juni 2021'},
//   {label: 'Pengaduan sedang diproses', timestamp: '11:22 15 Juni 2021'},
//   {label: 'Pengaduan selesai diproses', timestamp: '13:33 19 Juni 20222'},
// ]

function Login({...props}) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activeForm, setActiveForm] = React.useState("Login");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleClose = () => {
    setError("")
    setSuccess("")
  }

  const handleLogin = () => {
    console.log(email, password)
    props.fetchLogin(email, password)
  }

  const handleRegister = () => {
    axios({
      method: "post",
      url: "http://172.105.119.140:8086/api/user",
      data: {
        email: email,
        full_name: name,
        phone_no: phoneNumber,
        password: password,
      }
    })
    .then((response) => {
      if(response.status == 200){
        if(response.data.status == "success"){
          //loading(false)
          console.log(response.data)
          setSuccess("Registrasi berhasil! Silahkan mulai login.")
        } else {
          setError("Gagal mendapat respon! Cek koneksi anda.") // ganti message
        }
      } else {
        setError("Gagal mendapat respon! Cek koneksi anda.") // ganti message
      }
    })
    .catch(function(error){
      //loading(false)
      console.log(error)
      if(error.response){
        if(error.response.status == 401 || error.response.status == 403 || error.response.status == 400){
          setError("Gagal mendapat respon! Cek koneksi anda.") // ganti message nanti
        } else if(error.response.status === 404 || error.response.status === 500){
          setError("Server tidak dapat dihubungi!") //"Server cannot be contacted! Please ask your system administrator!: Enum"
        } else {
          setError("Terjadi kesalahan. Cobalah sesaat lagi.") //"Something went wrong... Please try again later..."
        }
      } else if(error.request){
        setError("Gagal mendapat respon! Cek koneksi anda.") //"Request have no response! Please check on your internet connection and refresh this page."
      } else {
        setError("Terjadi kesalahan. Cobalah sesaat lagi.") //"Something went wrong... Please try again later..."
      }
    })
  }

  const switchTo = (nextForm) => {
    setEmail("")
    setPassword("")
    setName("")
    setPhoneNumber("")
    setActiveForm(nextForm)
  }

  console.log(cookie.load("token"))

  return (
    <div>
    {cookie.load("token")?
      <Redirect from="/" to="/report" />
    :
      <Card>
        <CardBody style={{padding: "48px 64px 64px 64px"}}>
          <div style={titleSelector}>
            <div>
              <Button style={activeForm=="Login"?activeButtonStyle:inactiveButtonStyle} color="transparent" className={classes.title} onClick={() => switchTo("Login")}>
                Masuk
              </Button>
            </div>
            <div>
              <Button style={activeForm=="Signup"?activeButtonStyle:inactiveButtonStyle}  color="transparent" className={classes.title} onClick={() => switchTo("Signup")}>
                Daftar
              </Button>
            </div>
          </div>
          {activeForm=="Login"?
            <div>
              <FormControl fullWidth margin="normal" style={{margin: "32px 0px"}}>
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  error={email==""}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                <TextField
                  label="Password"
                  id="outlined-size-small"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  error={password==""}
                />
              </FormControl>
              <Button
                style={{margin: "32px 0px", width: "100%"}}
                className={classes.buttonSave}
                onClick={() => handleLogin()}
                disabled={email == "" || password == ""}
              >
                Login
              </Button>
            </div>
          :null}
          {activeForm=="Signup"?
            <div>
              <FormControl fullWidth margin="normal" style={{margin: "32px 0px"}}>
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  error={email==""}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                <TextField
                  label="Nama"
                  id="outlined-size-small"
                  placeholder="Nama"
                  variant="outlined"
                  size="small"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  error={name==""}
                />
              </FormControl>
                <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                  <TextField
                    label="No. Handphone"
                    id="outlined-size-small"
                    placeholder="No. Handphone"
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={e => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    error={phoneNumber==""}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
                  <TextField
                    label="Password"
                    id="outlined-size-small"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={password==""}
                  />
                </FormControl>
              <Button
                style={{margin: "32px 0px", width: "100%"}}
                className={classes.buttonSave}
                onClick={() => handleRegister()}
                disabled={email == "" || name == "" || phoneNumber == "" || password == ""}
              >
                Daftar
              </Button>
            </div>
          :null}
        </CardBody>
      </Card>}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={success != ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error != ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

const loginPropTypes = {
  isAuthenticated: PropTypes.bool,
  fetchLogin: PropTypes.func,
}

Login.propTypes = loginPropTypes

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authStore.isAuthenticated,
  }
}

export default connect(mapStateToProps, {fetchLogin})(Login)
