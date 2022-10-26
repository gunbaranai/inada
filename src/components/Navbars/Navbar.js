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
import { ArrowDropDown, Menu } from '@material-ui/icons';
// core components
//import AdminNavbarLinks from "./AdminNavbarLinks.js";
//import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

//hooks
// import { useRouteName } from "hooks";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import title from "assets/img/business_job_tobitsuku.png"

const useStyles = makeStyles(styles);
const inactiveButtonStyle = {
  color: '#fff',
}
// const activeButtonStyle = {
//   color: '#fff',
//   fontWeight: '700',
//   borderBottom: '5px solid white',
// }

export default function Header(props) {
  const classes = useStyles();
  // const routeName = useRouteName();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(null);
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
  const handleClickMenu = (event) => {
    if (openMenu && openMenu.contains(event.target)) {
      setOpenMenu(null);
    } else {
      setOpenMenu(event.currentTarget);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  console.log(props.isAuthenticated)
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={window.innerWidth >= 960?classes.container:classes.mobileContainer}>
        {window.innerWidth >= 960?
          <GridContainer style={{display: 'contents'}}>
          <GridItem md={6} style={{textAlign: 'left'}}>
            <Link to="/list">
              <img src={title} height="64px" />
            </Link>
          </GridItem>
          {/*<GridItem md={4}>
            <div className={classes.flex}>
              {/* Here we create navbar brand, based on route name */}
              {/*<div>
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
          </GridItem>*/}
          <GridItem md={6} style={{textAlign: 'right'}}>
            <div style={{display: 'flex', flexDirection: 'row', float: 'right'}}>
              {cookie.load("token")?
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
                    Login
                  </Button>
                </Link>
              }
            </div>
          </GridItem>
          </GridContainer>
        :
          <GridContainer style={{display: 'contents'}}>
            <GridItem md={9} style={{textAlign: 'left'}}>
              <img src={title} height="64px" />
            </GridItem>
            <GridItem md={3} style={{textAlign: 'right'}}>
              <Menu style={{fontSize: '64px', color: '#fff', cursor: 'pointer'}} onClick={handleClickMenu}/>
              <Poppers
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                transition
                disablePortal
                placement="bottom-end"
                className={
                  classNames({ [classes.popperClose]: !openMenu }) +
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
                      <ClickAwayListener onClickAway={handleCloseMenu}>
                        <MenuList role="menu" style={{padding: '24px'}}>
                          {/*<Link to="/report">
                            <MenuItem
                              onClick={handleCloseMenu}
                              className={classes.dropdownItem}
                            >
                              Buat Pengaduan
                            </MenuItem>
                          </Link>
                          <Link to="/track">
                            <MenuItem
                              onClick={handleCloseMenu}
                              className={classes.dropdownItem}
                            >
                              Lacak Pengaduan
                            </MenuItem>
                          </Link>
                          <Divider light style={{margin: '16px 0px'}} />*/}
                          {!cookie.load("token")?
                            <Link to="/login">
                              <MenuItem
                                onClick={handleCloseMenu}
                                className={classes.dropdownItem}
                              >
                                Login
                              </MenuItem>
                            </Link>
                          :null}
                          {cookie.load("token")?
                            <>
                            {/*<MenuItem
                              onClick={handleCloseMenu}
                              className={classes.dropdownItem}
                              disabled
                            >
                              Ubah Profil Pengguna
                            </MenuItem>
                            <Link to="/my-case">
                              <MenuItem
                                onClick={handleCloseMenu}
                                className={classes.dropdownItem}
                              >
                                Daftar Pengaduan
                              </MenuItem>
                            </Link>
                            <Divider light style={{margin: '16px 0px'}} />*/}
                            <Link to="/logout">
                              <MenuItem
                                onClick={handleCloseMenu}
                                className={classes.dropdownItem}
                              >
                                Logout
                              </MenuItem>
                            </Link>
                            </>
                          :null}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>
          </GridContainer>
        }
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
