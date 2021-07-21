import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
//import Sidebar from "components/Sidebar/Sidebar.js";

import { checkAuth } from "../redux/actions/aLogin";
import { connect } from "react-redux";
import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/headerStyle.js";

//import logo from "assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/report" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Header({ ...props }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return props.history.location.pathname !== "/login";
  };
  const resizeFunction = () => {

      console.log(window.innerWidth)
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true)
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);


  return (
    <div className={classes.wrapper}>
      {/*<Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={null}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'black'}
        {...rest}
      />*/}
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          isAuthenticated={props.isAuthenticated}
          {...props}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={mobileOpen?classes.mobileContent:classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={mobileOpen?classes.mobileContent:classes.loginContent}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}

const headerPropTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
}

Header.propTypes = headerPropTypes

function mapStateToProps(state) {
    return {
      authData: state.authStore.authData,
      inProgress: state.authStore.inProgress,
      isAuthenticated: state.authStore.isAuthenticated,
    };
  }

export default connect(mapStateToProps, {checkAuth})(Header)
