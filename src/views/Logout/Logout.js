import React from "react";
import PropTypes from "prop-types";
//import { Redirect } from "react-router-dom";
// @material-ui/core components
// core components
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "components/CustomButtons/Button.js";
import 'moment/locale/id';
import { clearAuth } from "../../redux/actions/aLogin";
import { connect } from "react-redux";
import { Close } from '@material-ui/icons';
import cookie from "react-cookies";

// const steps = [
//   {label: 'Pengaduan berhasil dibuat', timestamp: '15:39 14 Juni 2021'},
//   {label: 'Pengaduan sedang diproses', timestamp: '11:22 15 Juni 2021'},
//   {label: 'Pengaduan selesai diproses', timestamp: '13:33 19 Juni 20222'},
// ]

function Logout({...props}) {

  const handleLogout = () => {
    sessionStorage.clear()
    props.clearAuth()
    cookie.remove("token")
    props.history.push("/login")
  }

  return (
    <div>
    {cookie.load("token")?
      <Dialog open={props.history.location.pathname == "/logout"} onClose={() => props.history.goBack}>
        <DialogTitle style={{textAlign: "right"}}>
          <Close fontSize="large" style={{cursor: "pointer"}} onClick={() => props.history.goBack} />
        </DialogTitle>
        <DialogContent style={{margin: "0px 64px 64px 64px", textAlign: "center"}}>
          <div style={{fontWeight: "700", fontSize: "28px", textAlign: "left"}}>
            Anda akan keluar dari akun...
          </div>
          <Button style={{fontSize: "36px"}} onClick={() => handleLogout()}>
            Lanjut
          </Button>
          <Button style={{fontSize: "36px"}} onClick={() => props.history.goBack()}>
            Batal
          </Button>
        </DialogContent>
      </Dialog>
    :null}
    </div>
  );
}

const logoutPropTypes = {
  isAuthenticated: PropTypes.bool,
  clearAuth: PropTypes.func,
  history: PropTypes.object,
}

Logout.propTypes = logoutPropTypes

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authStore.isAuthenticated,
  }
}

export default connect(mapStateToProps, {clearAuth})(Logout)
