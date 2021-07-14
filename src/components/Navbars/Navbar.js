import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import IconButton from "@material-ui/core/IconButton";
//import Hidden from "@material-ui/core/Hidden";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// @material-ui/icons
//import Menu from "@material-ui/icons/Menu";
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
  console.log(routeName)
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <GridContainer style={{display: 'contents'}}>
          <GridItem md={4} style={{textAlign: 'left'}}>
            <img src={title} />
          </GridItem>
          <GridItem md={4}>
            <div className={classes.flex}>
              {/* Here we create navbar brand, based on route name */}
              <Link to="/report">
              <Button style={routeName=='Report'?activeButtonStyle:inactiveButtonStyle} color="transparent" className={classes.title}>
                Ajukan Pengaduan
              </Button>
              </Link>
              <Link to="/track">
              <Button style={routeName=='Tracker'?activeButtonStyle:inactiveButtonStyle}  color="transparent" className={classes.title}>
                Lacak Pengaduan
              </Button>
              </Link>
            </div>
          </GridItem>
          <GridItem md={4} style={{textAlign: 'right'}}>
            <img src={logo} />
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
};
