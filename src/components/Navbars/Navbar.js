import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
//import IconButton from "@material-ui/core/IconButton";
//import Hidden from "@material-ui/core/Hidden";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// @material-ui/icons
//import Menu from "@material-ui/icons/Menu";
import { ArrowDropDown } from '@material-ui/icons';
// core components
//import AdminNavbarLinks from "./AdminNavbarLinks.js";
//import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";

//hooks
import { useRouteName } from "hooks";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import title from "assets/img/header_title.png"
import logo from "assets/img/header_logo.png"

const useStyles = makeStyles(styles);
const inactiveButtonStyle = {
  color: '#fff',
}
const activeButtonStyle = {
  color: '#fff',
  fontWeight: '700',
  borderBottom: '5px solid white',
}

export default function Header(props) {
  const classes = useStyles();
  const routeName = useRouteName();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  console.log(routeName)
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <GridContainer style={{display: 'contents'}}>
          <GridItem md={4} style={{textAlign: 'left'}}>
            <img src={title} height="64px" />
          </GridItem>
          <GridItem md={4}>
            <div className={classes.flex}>
              {/* Here we create navbar brand, based on route name */}
              <div>
                <Link to="/report">
                  <Button style={routeName=='Report'?activeButtonStyle:inactiveButtonStyle} color="transparent" className={classes.title}>
                    Ajukan Pengaduan
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="/track">
                  <Button style={routeName=='Tracker'?activeButtonStyle:inactiveButtonStyle}  color="transparent" className={classes.title}>
                    Lacak Pengaduan
                  </Button>
                </Link>
              </div>
            </div>
          </GridItem>
          <GridItem md={4} style={{textAlign: 'right'}}>
            <div style={{display: 'flex', flexDirection: 'row', float: 'right'}}>
              {props.isAuthenticated?
                <div>
                  <Button
                    style={inactiveButtonStyle}
                    color="transparent"
                    className={classes.title}
                    onClick={handleClickProfile}
                  >
                    My Account <ArrowDropDown />
                  </Button>
                  <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    placement="bottom-end"
                    className={
                      classNames({ [classes.popperClose]: !openProfile }) +
                      " " +
                      classes.popperNav
                    }
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="profile-menu-list-grow"
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleCloseProfile}>
                            <MenuList role="menu" style={{padding: '24px'}}>
                              <MenuItem
                                onClick={handleCloseProfile}
                                className={classes.dropdownItem}
                                disabled
                              >
                                Ubah Profil Pengguna
                              </MenuItem>
                              <Divider light style={{margin: '16px 0px'}} />
                              <Link to="/my-case">
                                <MenuItem
                                  onClick={handleCloseProfile}
                                  className={classes.dropdownItem}
                                >
                                  Daftar Pengaduan
                                </MenuItem>
                              </Link>
                              <Divider light style={{margin: '16px 0px'}} />
                              <Link to="/logout">
                                <MenuItem
                                  onClick={handleCloseProfile}
                                  className={classes.dropdownItem}
                                >
                                  Keluar
                                </MenuItem>
                              </Link>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Poppers>
                </div>
              :
                <Link to="/login">
                  <Button style={inactiveButtonStyle} color="transparent" className={classes.title}>
                    Masuk/Daftar
                  </Button>
                </Link>
              }
              <img src={logo} height="64px" />
            </div>
          </GridItem>
        </GridContainer>
        {/*<Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>*/}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  isAuthenticated: PropTypes.bool,
};
